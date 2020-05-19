
(function(l, r) { if (l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (window.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(window.document);
var app = (function () {
    'use strict';

    function noop() { }
    const identity = x => x;
    function add_location(element, file, line, column, char) {
        element.__svelte_meta = {
            loc: { file, line, column, char }
        };
    }
    function run(fn) {
        return fn();
    }
    function blank_object() {
        return Object.create(null);
    }
    function run_all(fns) {
        fns.forEach(run);
    }
    function is_function(thing) {
        return typeof thing === 'function';
    }
    function safe_not_equal(a, b) {
        return a != a ? b == b : a !== b || ((a && typeof a === 'object') || typeof a === 'function');
    }

    const is_client = typeof window !== 'undefined';
    let now = is_client
        ? () => window.performance.now()
        : () => Date.now();
    let raf = is_client ? cb => requestAnimationFrame(cb) : noop;

    const tasks = new Set();
    function run_tasks(now) {
        tasks.forEach(task => {
            if (!task.c(now)) {
                tasks.delete(task);
                task.f();
            }
        });
        if (tasks.size !== 0)
            raf(run_tasks);
    }
    /**
     * Creates a new task that runs on each raf frame
     * until it returns a falsy value or is aborted
     */
    function loop(callback) {
        let task;
        if (tasks.size === 0)
            raf(run_tasks);
        return {
            promise: new Promise(fulfill => {
                tasks.add(task = { c: callback, f: fulfill });
            }),
            abort() {
                tasks.delete(task);
            }
        };
    }

    function append(target, node) {
        target.appendChild(node);
    }
    function insert(target, node, anchor) {
        target.insertBefore(node, anchor || null);
    }
    function detach(node) {
        node.parentNode.removeChild(node);
    }
    function element(name) {
        return document.createElement(name);
    }
    function text(data) {
        return document.createTextNode(data);
    }
    function space() {
        return text(' ');
    }
    function listen(node, event, handler, options) {
        node.addEventListener(event, handler, options);
        return () => node.removeEventListener(event, handler, options);
    }
    function attr(node, attribute, value) {
        if (value == null)
            node.removeAttribute(attribute);
        else if (node.getAttribute(attribute) !== value)
            node.setAttribute(attribute, value);
    }
    function set_custom_element_data(node, prop, value) {
        if (prop in node) {
            node[prop] = value;
        }
        else {
            attr(node, prop, value);
        }
    }
    function children(element) {
        return Array.from(element.childNodes);
    }
    function set_input_value(input, value) {
        if (value != null || input.value) {
            input.value = value;
        }
    }
    function set_style(node, key, value, important) {
        node.style.setProperty(key, value, important ? 'important' : '');
    }
    function toggle_class(element, name, toggle) {
        element.classList[toggle ? 'add' : 'remove'](name);
    }
    function custom_event(type, detail) {
        const e = document.createEvent('CustomEvent');
        e.initCustomEvent(type, false, false, detail);
        return e;
    }

    const active_docs = new Set();
    let active = 0;
    // https://github.com/darkskyapp/string-hash/blob/master/index.js
    function hash(str) {
        let hash = 5381;
        let i = str.length;
        while (i--)
            hash = ((hash << 5) - hash) ^ str.charCodeAt(i);
        return hash >>> 0;
    }
    function create_rule(node, a, b, duration, delay, ease, fn, uid = 0) {
        const step = 16.666 / duration;
        let keyframes = '{\n';
        for (let p = 0; p <= 1; p += step) {
            const t = a + (b - a) * ease(p);
            keyframes += p * 100 + `%{${fn(t, 1 - t)}}\n`;
        }
        const rule = keyframes + `100% {${fn(b, 1 - b)}}\n}`;
        const name = `__svelte_${hash(rule)}_${uid}`;
        const doc = node.ownerDocument;
        active_docs.add(doc);
        const stylesheet = doc.__svelte_stylesheet || (doc.__svelte_stylesheet = doc.head.appendChild(element('style')).sheet);
        const current_rules = doc.__svelte_rules || (doc.__svelte_rules = {});
        if (!current_rules[name]) {
            current_rules[name] = true;
            stylesheet.insertRule(`@keyframes ${name} ${rule}`, stylesheet.cssRules.length);
        }
        const animation = node.style.animation || '';
        node.style.animation = `${animation ? `${animation}, ` : ``}${name} ${duration}ms linear ${delay}ms 1 both`;
        active += 1;
        return name;
    }
    function delete_rule(node, name) {
        const previous = (node.style.animation || '').split(', ');
        const next = previous.filter(name
            ? anim => anim.indexOf(name) < 0 // remove specific animation
            : anim => anim.indexOf('__svelte') === -1 // remove all Svelte animations
        );
        const deleted = previous.length - next.length;
        if (deleted) {
            node.style.animation = next.join(', ');
            active -= deleted;
            if (!active)
                clear_rules();
        }
    }
    function clear_rules() {
        raf(() => {
            if (active)
                return;
            active_docs.forEach(doc => {
                const stylesheet = doc.__svelte_stylesheet;
                let i = stylesheet.cssRules.length;
                while (i--)
                    stylesheet.deleteRule(i);
                doc.__svelte_rules = {};
            });
            active_docs.clear();
        });
    }

    let current_component;
    function set_current_component(component) {
        current_component = component;
    }

    const dirty_components = [];
    const binding_callbacks = [];
    const render_callbacks = [];
    const flush_callbacks = [];
    const resolved_promise = Promise.resolve();
    let update_scheduled = false;
    function schedule_update() {
        if (!update_scheduled) {
            update_scheduled = true;
            resolved_promise.then(flush);
        }
    }
    function add_render_callback(fn) {
        render_callbacks.push(fn);
    }
    let flushing = false;
    const seen_callbacks = new Set();
    function flush() {
        if (flushing)
            return;
        flushing = true;
        do {
            // first, call beforeUpdate functions
            // and update components
            for (let i = 0; i < dirty_components.length; i += 1) {
                const component = dirty_components[i];
                set_current_component(component);
                update(component.$$);
            }
            dirty_components.length = 0;
            while (binding_callbacks.length)
                binding_callbacks.pop()();
            // then, once components are updated, call
            // afterUpdate functions. This may cause
            // subsequent updates...
            for (let i = 0; i < render_callbacks.length; i += 1) {
                const callback = render_callbacks[i];
                if (!seen_callbacks.has(callback)) {
                    // ...so guard against infinite loops
                    seen_callbacks.add(callback);
                    callback();
                }
            }
            render_callbacks.length = 0;
        } while (dirty_components.length);
        while (flush_callbacks.length) {
            flush_callbacks.pop()();
        }
        update_scheduled = false;
        flushing = false;
        seen_callbacks.clear();
    }
    function update($$) {
        if ($$.fragment !== null) {
            $$.update();
            run_all($$.before_update);
            const dirty = $$.dirty;
            $$.dirty = [-1];
            $$.fragment && $$.fragment.p($$.ctx, dirty);
            $$.after_update.forEach(add_render_callback);
        }
    }

    let promise;
    function wait() {
        if (!promise) {
            promise = Promise.resolve();
            promise.then(() => {
                promise = null;
            });
        }
        return promise;
    }
    function dispatch(node, direction, kind) {
        node.dispatchEvent(custom_event(`${direction ? 'intro' : 'outro'}${kind}`));
    }
    const outroing = new Set();
    let outros;
    function group_outros() {
        outros = {
            r: 0,
            c: [],
            p: outros // parent group
        };
    }
    function check_outros() {
        if (!outros.r) {
            run_all(outros.c);
        }
        outros = outros.p;
    }
    function transition_in(block, local) {
        if (block && block.i) {
            outroing.delete(block);
            block.i(local);
        }
    }
    function transition_out(block, local, detach, callback) {
        if (block && block.o) {
            if (outroing.has(block))
                return;
            outroing.add(block);
            outros.c.push(() => {
                outroing.delete(block);
                if (callback) {
                    if (detach)
                        block.d(1);
                    callback();
                }
            });
            block.o(local);
        }
    }
    const null_transition = { duration: 0 };
    function create_in_transition(node, fn, params) {
        let config = fn(node, params);
        let running = false;
        let animation_name;
        let task;
        let uid = 0;
        function cleanup() {
            if (animation_name)
                delete_rule(node, animation_name);
        }
        function go() {
            const { delay = 0, duration = 300, easing = identity, tick = noop, css } = config || null_transition;
            if (css)
                animation_name = create_rule(node, 0, 1, duration, delay, easing, css, uid++);
            tick(0, 1);
            const start_time = now() + delay;
            const end_time = start_time + duration;
            if (task)
                task.abort();
            running = true;
            add_render_callback(() => dispatch(node, true, 'start'));
            task = loop(now => {
                if (running) {
                    if (now >= end_time) {
                        tick(1, 0);
                        dispatch(node, true, 'end');
                        cleanup();
                        return running = false;
                    }
                    if (now >= start_time) {
                        const t = easing((now - start_time) / duration);
                        tick(t, 1 - t);
                    }
                }
                return running;
            });
        }
        let started = false;
        return {
            start() {
                if (started)
                    return;
                delete_rule(node);
                if (is_function(config)) {
                    config = config();
                    wait().then(go);
                }
                else {
                    go();
                }
            },
            invalidate() {
                started = false;
            },
            end() {
                if (running) {
                    cleanup();
                    running = false;
                }
            }
        };
    }
    function create_bidirectional_transition(node, fn, params, intro) {
        let config = fn(node, params);
        let t = intro ? 0 : 1;
        let running_program = null;
        let pending_program = null;
        let animation_name = null;
        function clear_animation() {
            if (animation_name)
                delete_rule(node, animation_name);
        }
        function init(program, duration) {
            const d = program.b - t;
            duration *= Math.abs(d);
            return {
                a: t,
                b: program.b,
                d,
                duration,
                start: program.start,
                end: program.start + duration,
                group: program.group
            };
        }
        function go(b) {
            const { delay = 0, duration = 300, easing = identity, tick = noop, css } = config || null_transition;
            const program = {
                start: now() + delay,
                b
            };
            if (!b) {
                // @ts-ignore todo: improve typings
                program.group = outros;
                outros.r += 1;
            }
            if (running_program) {
                pending_program = program;
            }
            else {
                // if this is an intro, and there's a delay, we need to do
                // an initial tick and/or apply CSS animation immediately
                if (css) {
                    clear_animation();
                    animation_name = create_rule(node, t, b, duration, delay, easing, css);
                }
                if (b)
                    tick(0, 1);
                running_program = init(program, duration);
                add_render_callback(() => dispatch(node, b, 'start'));
                loop(now => {
                    if (pending_program && now > pending_program.start) {
                        running_program = init(pending_program, duration);
                        pending_program = null;
                        dispatch(node, running_program.b, 'start');
                        if (css) {
                            clear_animation();
                            animation_name = create_rule(node, t, running_program.b, running_program.duration, 0, easing, config.css);
                        }
                    }
                    if (running_program) {
                        if (now >= running_program.end) {
                            tick(t = running_program.b, 1 - t);
                            dispatch(node, running_program.b, 'end');
                            if (!pending_program) {
                                // we're done
                                if (running_program.b) {
                                    // intro — we can tidy up immediately
                                    clear_animation();
                                }
                                else {
                                    // outro — needs to be coordinated
                                    if (!--running_program.group.r)
                                        run_all(running_program.group.c);
                                }
                            }
                            running_program = null;
                        }
                        else if (now >= running_program.start) {
                            const p = now - running_program.start;
                            t = running_program.a + running_program.d * easing(p / running_program.duration);
                            tick(t, 1 - t);
                        }
                    }
                    return !!(running_program || pending_program);
                });
            }
        }
        return {
            run(b) {
                if (is_function(config)) {
                    wait().then(() => {
                        // @ts-ignore
                        config = config();
                        go(b);
                    });
                }
                else {
                    go(b);
                }
            },
            end() {
                clear_animation();
                running_program = pending_program = null;
            }
        };
    }
    function mount_component(component, target, anchor) {
        const { fragment, on_mount, on_destroy, after_update } = component.$$;
        fragment && fragment.m(target, anchor);
        // onMount happens before the initial afterUpdate
        add_render_callback(() => {
            const new_on_destroy = on_mount.map(run).filter(is_function);
            if (on_destroy) {
                on_destroy.push(...new_on_destroy);
            }
            else {
                // Edge case - component was destroyed immediately,
                // most likely as a result of a binding initialising
                run_all(new_on_destroy);
            }
            component.$$.on_mount = [];
        });
        after_update.forEach(add_render_callback);
    }
    function destroy_component(component, detaching) {
        const $$ = component.$$;
        if ($$.fragment !== null) {
            run_all($$.on_destroy);
            $$.fragment && $$.fragment.d(detaching);
            // TODO null out other refs, including component.$$ (but need to
            // preserve final state?)
            $$.on_destroy = $$.fragment = null;
            $$.ctx = [];
        }
    }
    function make_dirty(component, i) {
        if (component.$$.dirty[0] === -1) {
            dirty_components.push(component);
            schedule_update();
            component.$$.dirty.fill(0);
        }
        component.$$.dirty[(i / 31) | 0] |= (1 << (i % 31));
    }
    function init(component, options, instance, create_fragment, not_equal, props, dirty = [-1]) {
        const parent_component = current_component;
        set_current_component(component);
        const prop_values = options.props || {};
        const $$ = component.$$ = {
            fragment: null,
            ctx: null,
            // state
            props,
            update: noop,
            not_equal,
            bound: blank_object(),
            // lifecycle
            on_mount: [],
            on_destroy: [],
            before_update: [],
            after_update: [],
            context: new Map(parent_component ? parent_component.$$.context : []),
            // everything else
            callbacks: blank_object(),
            dirty
        };
        let ready = false;
        $$.ctx = instance
            ? instance(component, prop_values, (i, ret, ...rest) => {
                const value = rest.length ? rest[0] : ret;
                if ($$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value)) {
                    if ($$.bound[i])
                        $$.bound[i](value);
                    if (ready)
                        make_dirty(component, i);
                }
                return ret;
            })
            : [];
        $$.update();
        ready = true;
        run_all($$.before_update);
        // `false` as a special case of no DOM component
        $$.fragment = create_fragment ? create_fragment($$.ctx) : false;
        if (options.target) {
            if (options.hydrate) {
                const nodes = children(options.target);
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.l(nodes);
                nodes.forEach(detach);
            }
            else {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.c();
            }
            if (options.intro)
                transition_in(component.$$.fragment);
            mount_component(component, options.target, options.anchor);
            flush();
        }
        set_current_component(parent_component);
    }
    class SvelteComponent {
        $destroy() {
            destroy_component(this, 1);
            this.$destroy = noop;
        }
        $on(type, callback) {
            const callbacks = (this.$$.callbacks[type] || (this.$$.callbacks[type] = []));
            callbacks.push(callback);
            return () => {
                const index = callbacks.indexOf(callback);
                if (index !== -1)
                    callbacks.splice(index, 1);
            };
        }
        $set() {
            // overridden by instance, if it has props
        }
    }

    function dispatch_dev(type, detail) {
        document.dispatchEvent(custom_event(type, Object.assign({ version: '3.22.2' }, detail)));
    }
    function append_dev(target, node) {
        dispatch_dev("SvelteDOMInsert", { target, node });
        append(target, node);
    }
    function insert_dev(target, node, anchor) {
        dispatch_dev("SvelteDOMInsert", { target, node, anchor });
        insert(target, node, anchor);
    }
    function detach_dev(node) {
        dispatch_dev("SvelteDOMRemove", { node });
        detach(node);
    }
    function listen_dev(node, event, handler, options, has_prevent_default, has_stop_propagation) {
        const modifiers = options === true ? ["capture"] : options ? Array.from(Object.keys(options)) : [];
        if (has_prevent_default)
            modifiers.push('preventDefault');
        if (has_stop_propagation)
            modifiers.push('stopPropagation');
        dispatch_dev("SvelteDOMAddEventListener", { node, event, handler, modifiers });
        const dispose = listen(node, event, handler, options);
        return () => {
            dispatch_dev("SvelteDOMRemoveEventListener", { node, event, handler, modifiers });
            dispose();
        };
    }
    function attr_dev(node, attribute, value) {
        attr(node, attribute, value);
        if (value == null)
            dispatch_dev("SvelteDOMRemoveAttribute", { node, attribute });
        else
            dispatch_dev("SvelteDOMSetAttribute", { node, attribute, value });
    }
    function set_data_dev(text, data) {
        data = '' + data;
        if (text.data === data)
            return;
        dispatch_dev("SvelteDOMSetData", { node: text, data });
        text.data = data;
    }
    function validate_slots(name, slot, keys) {
        for (const slot_key of Object.keys(slot)) {
            if (!~keys.indexOf(slot_key)) {
                console.warn(`<${name}> received an unexpected slot "${slot_key}".`);
            }
        }
    }
    class SvelteComponentDev extends SvelteComponent {
        constructor(options) {
            if (!options || (!options.target && !options.$$inline)) {
                throw new Error(`'target' is a required option`);
            }
            super();
        }
        $destroy() {
            super.$destroy();
            this.$destroy = () => {
                console.warn(`Component was already destroyed`); // eslint-disable-line no-console
            };
        }
        $capture_state() { }
        $inject_state() { }
    }

    function cubicOut(t) {
        const f = t - 1.0;
        return f * f * f + 1.0;
    }

    function fade(node, { delay = 0, duration = 400, easing = identity }) {
        const o = +getComputedStyle(node).opacity;
        return {
            delay,
            duration,
            easing,
            css: t => `opacity: ${t * o}`
        };
    }
    function fly(node, { delay = 0, duration = 400, easing = cubicOut, x = 0, y = 0, opacity = 0 }) {
        const style = getComputedStyle(node);
        const target_opacity = +style.opacity;
        const transform = style.transform === 'none' ? '' : style.transform;
        const od = target_opacity * (1 - opacity);
        return {
            delay,
            duration,
            easing,
            css: (t, u) => `
			transform: ${transform} translate(${(1 - t) * x}px, ${(1 - t) * y}px);
			opacity: ${target_opacity - (od * u)}`
        };
    }

    var Question_class = class Question {
    	constructor(args) {
    		this.question 	= args.question;
    		this.options   	= args.options;
    		this.answer   	= args.answer;
    		this.correct 	= false;
    	}
    	doAnswer(option) {
    		this.correct  	= (this.answer == option);
    	}
    };

    const questions = {
    	english: {
    		list: [
    			new Question_class({
    				question: `<span style="padding: 0 2px;">.......</span> three sisters`,
    				options: [
    					`She has got`,
    					`She is`,
    					`She have`,
    					`She gets `,
    				],
    				answer: 0
    			}),
    			new Question_class({
    				question: `- Would you like a cup of coffee? - Yes, I <span style="padding: 0 2px;">.......</span>`,
    				options: [
    					`Like`,
    					`Will`,
    					`Would`,
    					`Do`,
    				],
    				answer: 2
    			}),
    			new Question_class({
    				question: `She <span style="padding: 0 2px;">.......</span> like football`,
    				options: [
    					`don’t`,
    					`doesn’t`,
    					`No`,
    					`Not`,
    				],
    				answer: 1
    			}),
    			new Question_class({
    				question: `Please, don’t talk to me now. I <span style="padding: 0 2px;">.......</span> to do my homework. `,
    				options: [
    					`Try`,
    					`Tried`,
    					`am trying`,
    					`have tried`,
    				],
    				answer: 2
    			}),
    			new Question_class({
    				question: `Keep in a cold place`,
    				options: [
    					`on furniture`,
    					`on a book`,
    					`on clothes`,
    					`on food`,
    				],
    				answer: 3
    			}),
    			new Question_class({
    				question: `Please, give the right money to the driver`,
    				options: [
    					`in a taxi`,
    					`on a bus`,
    					`in a bank`,
    					`in a station`,
    				],
    				answer: 1
    			}),
    			new Question_class({
    				question: `- Where is your phone? - I <span style="padding: 0 2px;">.......</span> it last week.`,
    				options: [
    					`lose`,
    					`have lost `,
    					`lost`,
    					`loosed`,
    				],
    				answer: 2
    			}),
    			new Question_class({
    				question: `<span style="padding: 0 2px;">.......</span> some apples in the fridge.`,
    				options: [
    					`There are`,
    					`There is`,
    					`There aren’t`,
    					`Here are`,
    				],
    				answer: 0
    			}),
    			new Question_class({
    				question: `- Is Mary <span style="padding: 0 2px;">.......</span> Clare? No, I don’t think so.`,
    				options: [
    					`more smarter than`,
    					`smarter than`,
    					`smart like`,
    					`so smart as`,
    				],
    				answer: 1
    			}),
    			new Question_class({
    				question: `Do you like <span style="padding: 0 2px;">.......</span> there?`,
    				options: [
    					`to studying`,
    					`doesn’t`,
    					`Studied`,
    					`Studying`,
    				],
    				answer: 3
    			}),
    			new Question_class({
    				question: `I am looking <span style="padding: 0 2px;">.......</span> Mr. Ferguson’s office.`,
    				options: [
    					`At`,
    					`For`,
    					`In`,
    					`Forward`,
    				],
    				answer: 1
    			}),
    			new Question_class({
    				question: `She likes living in Spain, <span style="padding: 0 2px;">.......</span>? `,
    				options: [
    					`do she`,
    					`is she`,
    					`doesn’t she? `,
    					`isn´t she? `,
    				],
    				answer: 2
    			}),
    			new Question_class({
    				question: `She told me she <span style="padding: 0 2px;">.......</span> him before. `,
    				options: [
    					`Visited `,
    					`had visited `,
    					`has visited `,
    					`was visiting `,
    				],
    				answer: 1
    			}),
    			new Question_class({
    				question: `- Do you smoke? - No, I don’t, but I <span style="padding: 0 2px;">.......</span> .`,
    				options: [
    					`was used to `,
    					`was using to `,
    					`am used to `,
    					`used to`,
    				],
    				answer: 3
    			}),
    			new Question_class({
    				question: `I <span style="padding: 0 2px;">.......</span> for Apple since last year.`,
    				options: [
    					`have been working `,
    					`Worked `,
    					`has been working `,
    					`had worked `,
    				],
    				answer: 0
    			}),
    			new Question_class({
    				question: `The news <span style="padding: 0 2px;">.......</span> so fascinating!`,
    				options: [
    					`Are `,
    					`Is `,
    					`Will `,
    					`have been `,
    				],
    				answer: 1
    			}),
    			new Question_class({
    				question: `The police <span style="padding: 0 2px;">.......</span> really angry.`,
    				options: [
    					`Was `,
    					`Were `,
    					`has been `,
    					`is going `,
    				],
    				answer: 1
    			}),
    			new Question_class({
    				question: `I think I <span style="padding: 0 2px;">.......</span> her yesterday.`,
    				options: [
    					`should invite `,
    					`should have invited `,
    					`would have invited `,
    					`shall have invited `,
    				],
    				answer: 1
    			}),
    			new Question_class({
    				question: `If you want to join the club, you have to fill <span style="padding: 0 2px;">.......</span> this form. `,
    				options: [
    					`Up `,
    					`Out `,
    					`Into `,
    					`Over `,
    				],
    				answer: 1
    			}),
    			new Question_class({
    				question: `Our plan worked <span style="padding: 0 2px;">.......</span> very well!`,
    				options: [
    					`In `,
    					`Off `,
    					`Out `,
    					`On `,
    				],
    				answer: 2
    			}),
    			new Question_class({
    				question: `The plane finally took <span style="padding: 0 2px;">.......</span>`,
    				options: [
    					`Off `,
    					`On `,
    					`Of `,
    					`Out `,
    				],
    				answer: 0
    			}),
    			new Question_class({
    				question: `I’d like to <span style="padding: 0 2px;">.......</span> this blouse on. `,
    				options: [
    					`See `,
    					`Try `,
    					`Buy `,
    					`Change `,
    				],
    				answer: 1
    			}),
    			new Question_class({
    				question: `I’m not going to put <span style="padding: 0 2px;">.......</span> with your moods anymore! `,
    				options: [
    					`Off `,
    					`On `,
    					`To `,
    					`Up `,
    				],
    				answer: 3
    			}),
    			new Question_class({
    				question: `After many years of research, they found the solution <span style="padding: 0 2px;">.......</span> `,
    				options: [
    					`at the end `,
    					`in the end`,
    					`by the end `,
    					`on the end`,
    				],
    				answer: 1
    			}),
    			new Question_class({
    				question: `You can take it with you <span style="padding: 0 2px;">.......</span> you give it back. `,
    				options: [
    					`as soon as `,
    					`as well es `,
    					`as far as `,
    					`as long as `,
    				],
    				answer: 3
    			}),
    			new Question_class({
    				question: `I won’t go to the theatre <span style="padding: 0 2px;">.......</span> you come with me.`,
    				options: [
    					`Still `,
    					`Otherwise `,
    					`Except `,
    					`Unless `,
    				],
    				answer: 3
    			}),
    			new Question_class({
    				question: `I think I’ve got a cold, I can’t stop <span style="padding: 0 2px;">.......</span> . `,
    				options: [
    					`the sneezing `,
    					`to sneeze `,
    					`Sneezing`,
    					`Sneeze `,
    				],
    				answer: 2
    			}),
    			new Question_class({
    				question: `The financial director <span style="padding: 0 2px;">.......</span> for almost an hour. `,
    				options: [
    					`kept us waiting`,
    					`kept us to wait `,
    					`kept us wait `,
    					`kept us to waiting`,
    				],
    				answer: 0
    			}),

    		],
    	},
    	turkish: {
    		list: [
    			new Question_class({
    				question: `Ahmet: Nerelisiniz? Funda: <span style="padding: 0 2px;">.......</span>`,
    				options: [
    					`Ben Türk`,
    					`Ben Ankaralıyım `,
    					`Biz Ankara`,
    					`Siz Türk `,
    				],
    				answer: 1
    			}),
    			new Question_class({
    				question: `- Okul <span style="padding: 0 2px;">.......</span>? `,
    				options: [
    					`Nerededir `,
    					`Buradadır `,
    					`Gidelim `,
    					`Geldim `,
    				],
    				answer: 0
    			}),
    			new Question_class({
    				question: `O<span style="padding: 0 2px;">.......</span> arkadaşın mı? `,
    				options: [
    					`Sen `,
    					`Sizin `,
    					`Senin `,
    					`Siz `,
    				],
    				answer: 2
    			}),
    			new Question_class({
    				question: `<span style="padding: 0 2px;">.......</span> adı nedir? `,
    				options: [
    					`Babanızın `,
    					`O `,
    					`Siz `,
    					`Sen `,
    				],
    				answer: 0
    			}),
    			new Question_class({
    				question: `Öğretmenimiz ve <span style="padding: 0 2px;">.......</span> geziye katılıyoruz. `,
    				options: [
    					`Ali `,
    					`Biz `,
    					`O `,
    					`Onlar `,
    				],
    				answer: 1
    			}),
    			new Question_class({
    				question: `Yaşınız <span style="padding: 0 2px;">.......</span>.? `,
    				options: [
    					`Nasıldır `,
    					`Nerededir `,
    					`Kaçtır `,
    					`Kaçadır `,
    				],
    				answer: 2
    			}),
    			new Question_class({
    				question: `- Kaç yaşındasınız? - On<span style="padding: 0 2px;">.......</span>. `,
    				options: [
    					`Dokuz `,
    					`Otuz `,
    					`Yüz `,
    					`Onüç `,
    				],
    				answer: 0
    			}),
    			new Question_class({
    				question: `- Antalya’ya kimle gidiyorsunuz? - <span style="padding: 0 2px;">.......</span> `,
    				options: [
    					`Ben `,
    					`O `,
    					`Onunla `,
    					`Üçü `,
    				],
    				answer: 2
    			}),
    			new Question_class({
    				question: `Ali: Mehmet nereye gitti? Oya: Mehmet <span style="padding: 0 2px;">.......</span> gitti.`,
    				options: [
    					`Hastaneye `,
    					`Okulda `,
    					`Sınıftan `,
    					`Pazar `,
    				],
    				answer: 0
    			}),
    			new Question_class({
    				question: `Mustafa: Mehmet Bey tatile kiminle çıkacak? Hilal: <span style="padding: 0 2px;">.......</span>`,
    				options: [
    					`Arabasıyla `,
    					`Ailesiyle `,
    					`Köpeği `,
    					`Uçakla `,
    				],
    				answer: 1
    			}),
    			new Question_class({
    				question: `Çiçekleri <span style="padding: 0 2px;">.......</span> üzerine bırak! `,
    				options: [
    					`Saga `,
    					`Üstünde `,
    					`Masanın `,
    					`Saksıdan `,
    				],
    				answer: 1
    			}),
    			new Question_class({
    				question: `Bu <span style="padding: 0 2px;">.......</span> okul var mı?`,
    				options: [
    					`Civarda `,
    					`Çayda `,
    					`Çaydanlıkta `,
    					`Çarda `,
    				],
    				answer: 0
    			}),
    			new Question_class({
    				question: `Filiz: Dün işe gitmedin. Neden? Özge: Çünkü dün <span style="padding: 0 2px;">.......</span>`,
    				options: [
    					`Hastaydım `,
    					`başım ağrıyor`,
    					`Halsizim `,
    					`Gitmeyeceğim `,
    				],
    				answer: 0
    			}),
    			new Question_class({
    				question: `- Ne zaman <span style="padding: 0 2px;">.......</span>? - Dün `,
    				options: [
    					`Gidelim `,
    					`Gittin `,
    					`Gideceğiz `,
    					`Gidiyoruz `,
    				],
    				answer: 1
    			}),
    			new Question_class({
    				question: `Marina: Siz şimdi ne <span style="padding: 0 2px;">.......</span>? Olga: Ders çalışıyoruz.`,
    				options: [
    					`Yapıyorsunuz `,
    					`Gidiyorsunuz `,
    					`Nereye `,
    					`Gidelim `,
    				],
    				answer: 0
    			}),
    			new Question_class({
    				question: `Ben Moskova’ya 10 yıl önce <span style="padding: 0 2px;">.......</span> `,
    				options: [
    					`Gidiyorum `,
    					`Gittim `,
    					`Gideceğim `,
    					`Geleceğim `,
    				],
    				answer: 0
    			}),
    			new Question_class({
    				question: `Zarfı kime <span style="padding: 0 2px;">.......</span> etmem lazım?`,
    				options: [
    					`Vermem `,
    					`Düşmem `,
    					`Teslim `,
    					`Geldim `,
    				],
    				answer: 2
    			}),
    			new Question_class({
    				question: `Tanıştığımıza memnun <span style="padding: 0 2px;">.......</span> `,
    				options: [
    					`Verdim `,
    					`Yaptım `,
    					`Aldım `,
    					`Oldum `,
    				],
    				answer: 3
    			}),
    			new Question_class({
    				question: `Kırmızının eş anlamlısı aşağıdakilerden hangisidir? `,
    				options: [
    					`Al `,
    					`Ak `,
    					`At `,
    					`Ad `,
    				],
    				answer: 0
    			}),
    			new Question_class({
    				question: `Beyaz kelimesinin eş anlamlısı aşağıdakilerden hangisidir?`,
    				options: [
    					`Ar `,
    					`Ak `,
    					`Av `,
    					`Az `,
    				],
    				answer: 1
    			}),
    			new Question_class({
    				question: `<span style="padding: 0 2px;">.......</span>.azaltmak istemem ancak sonuçtan memnun değilim. `,
    				options: [
    					`Beklentinizi `,
    					`Düşüncenizi `,
    					`Fikrinizi `,
    					`Geri `,
    				],
    				answer: 0
    			}),
    			new Question_class({
    				question: `Hata <span style="padding: 0 2px;">.......</span>. önemli değil. `,
    				options: [
    					`Etmeniz `,
    					`Yapmanız `,
    					`Başarmanız `,
    					`yol açmanız `,
    				],
    				answer: 1
    			}),
    			new Question_class({
    				question: `- O neden bu hallere düştü? - Aşk <span style="padding: 0 2px;">.......</span>. `,
    				options: [
    					`Çünkü `,
    					`Yüzünden `,
    					`Sebep `,
    					`Olsun `,
    				],
    				answer: 1
    			}),
    			new Question_class({
    				question: `- O nasıl bir insandır? - <span style="padding: 0 2px;">.......</span> bir insandır. `,
    				options: [
    					`Günlü `,
    					`Güven `,
    					`Güvence `,
    					`Güvenilir `,
    				],
    				answer: 3
    			}),
    			new Question_class({
    				question: `Davetimize <span style="padding: 0 2px;">.......</span> ettiğiniz için teşekkür ederiz.`,
    				options: [
    					`Katıldığınız `,
    					`Icabet `,
    					`Geldiğiniz `,
    					`Haber `,
    				],
    				answer: 1
    			}),
    			new Question_class({
    				question: `Kendimi <span style="padding: 0 2px;">.......</span> buraya gelirim. `,
    				options: [
    					`gelir gelmez `,
    					`bildim bileli `,
    					`geldim geleli `,
    					` tuttum tutalı `,
    				],
    				answer: 1
    			}),
    			new Question_class({
    				question: `Yazın buraların keyfi bir <span style="padding: 0 2px;">.......</span> olur.`,
    				options: [
    					`Türlü `,
    					`Yaz `,
    					`Başka `,
    					`Çeşitli `,
    				],
    				answer: 2
    			}),
    			new Question_class({
    				question: `Ahmet beni <span style="padding: 0 2px;">.......</span>, takip ediyor. `,
    				options: [
    					`geri geri `,
    					`adım adım`,
    					`ters ters `,
    					`Rengarenk `,
    				],
    				answer: 1
    			}),

    		]
    	}
    };

    /* src\App.svelte generated by Svelte v3.22.2 */
    const file = "src\\App.svelte";

    // (59:2) {#if page == "landing"}
    function create_if_block_2(ctx) {
    	let section;
    	let div0;
    	let ion_icon0;
    	let t0;
    	let span0;
    	let t2;
    	let p;
    	let t4;
    	let div1;
    	let span1;
    	let t6;
    	let span2;
    	let t8;
    	let div2;
    	let t10;
    	let div3;
    	let h3;
    	let t12;
    	let input;
    	let t13;
    	let div4;
    	let span3;
    	let t15;
    	let ion_icon1;
    	let dispose;

    	const block = {
    		c: function create() {
    			section = element("section");
    			div0 = element("div");
    			ion_icon0 = element("ion-icon");
    			t0 = space();
    			span0 = element("span");
    			span0.textContent = "Language Placement Test";
    			t2 = space();
    			p = element("p");
    			p.textContent = "Select one of these languages to continue :";
    			t4 = space();
    			div1 = element("div");
    			span1 = element("span");
    			span1.textContent = "English";
    			t6 = space();
    			span2 = element("span");
    			span2.textContent = "Turkish";
    			t8 = space();
    			div2 = element("div");
    			div2.textContent = "this is a free online placement test which helps you to determine your level in english or turkish language.\n\t\t\t\t\tTake the exam and let us choose the best course for you.";
    			t10 = space();
    			div3 = element("div");
    			h3 = element("h3");
    			h3.textContent = "Plesae enter your full name :";
    			t12 = space();
    			input = element("input");
    			t13 = space();
    			div4 = element("div");
    			span3 = element("span");
    			span3.textContent = "Start";
    			t15 = space();
    			ion_icon1 = element("ion-icon");
    			set_custom_element_data(ion_icon0, "name", "checkmark-circle");
    			set_custom_element_data(ion_icon0, "class", "svelte-129qqcr");
    			add_location(ion_icon0, file, 61, 5, 1453);
    			attr_dev(span0, "class", "svelte-129qqcr");
    			add_location(span0, file, 62, 5, 1504);
    			attr_dev(div0, "class", "title svelte-129qqcr");
    			add_location(div0, file, 60, 4, 1428);
    			attr_dev(p, "class", "svelte-129qqcr");
    			add_location(p, file, 64, 4, 1556);
    			attr_dev(span1, "class", "svelte-129qqcr");
    			toggle_class(span1, "active", /*lang*/ ctx[0] == "english");
    			add_location(span1, file, 68, 5, 1647);
    			attr_dev(span2, "class", "svelte-129qqcr");
    			toggle_class(span2, "active", /*lang*/ ctx[0] == "turkish");
    			add_location(span2, file, 69, 5, 1740);
    			attr_dev(div1, "class", "langs svelte-129qqcr");
    			add_location(div1, file, 67, 4, 1622);
    			attr_dev(div2, "class", "description svelte-129qqcr");
    			add_location(div2, file, 71, 4, 1843);
    			add_location(h3, file, 76, 6, 2085);
    			attr_dev(input, "type", "text");
    			attr_dev(input, "placeholder", "Your name");
    			attr_dev(input, "class", "name svelte-129qqcr");
    			add_location(input, file, 77, 6, 2131);
    			attr_dev(div3, "class", "auth svelte-129qqcr");
    			add_location(div3, file, 75, 4, 2060);
    			attr_dev(span3, "class", "svelte-129qqcr");
    			add_location(span3, file, 83, 5, 2316);
    			set_custom_element_data(ion_icon1, "name", "caret-forward");
    			set_custom_element_data(ion_icon1, "class", "svelte-129qqcr");
    			add_location(ion_icon1, file, 84, 5, 2340);
    			attr_dev(div4, "class", "next svelte-129qqcr");
    			add_location(div4, file, 79, 4, 2221);
    			attr_dev(section, "class", "landing");
    			add_location(section, file, 59, 3, 1398);
    		},
    		m: function mount(target, anchor, remount) {
    			insert_dev(target, section, anchor);
    			append_dev(section, div0);
    			append_dev(div0, ion_icon0);
    			append_dev(div0, t0);
    			append_dev(div0, span0);
    			append_dev(section, t2);
    			append_dev(section, p);
    			append_dev(section, t4);
    			append_dev(section, div1);
    			append_dev(div1, span1);
    			append_dev(div1, t6);
    			append_dev(div1, span2);
    			append_dev(section, t8);
    			append_dev(section, div2);
    			append_dev(section, t10);
    			append_dev(section, div3);
    			append_dev(div3, h3);
    			append_dev(div3, t12);
    			append_dev(div3, input);
    			set_input_value(input, /*name*/ ctx[3]);
    			append_dev(section, t13);
    			append_dev(section, div4);
    			append_dev(div4, span3);
    			append_dev(div4, t15);
    			append_dev(div4, ion_icon1);
    			if (remount) run_all(dispose);

    			dispose = [
    				listen_dev(span1, "click", /*click_handler*/ ctx[7], false, false, false),
    				listen_dev(span2, "click", /*click_handler_1*/ ctx[8], false, false, false),
    				listen_dev(input, "input", /*input_input_handler*/ ctx[9]),
    				listen_dev(div4, "click", /*click_handler_2*/ ctx[10], false, false, false)
    			];
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*lang*/ 1) {
    				toggle_class(span1, "active", /*lang*/ ctx[0] == "english");
    			}

    			if (dirty & /*lang*/ 1) {
    				toggle_class(span2, "active", /*lang*/ ctx[0] == "turkish");
    			}

    			if (dirty & /*name*/ 8 && input.value !== /*name*/ ctx[3]) {
    				set_input_value(input, /*name*/ ctx[3]);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(section);
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_2.name,
    		type: "if",
    		source: "(59:2) {#if page == \\\"landing\\\"}",
    		ctx
    	});

    	return block;
    }

    // (89:2) {#if page == "question"}
    function create_if_block_1(ctx) {
    	let section;
    	let div0;
    	let ion_icon;
    	let t0;
    	let span;
    	let t1;
    	let t2_value = /*qnc*/ ctx[2] + 1 + "";
    	let t2;
    	let t3;
    	let t4_value = questions[/*lang*/ ctx[0]].list.length + "";
    	let t4;
    	let t5;
    	let p;
    	let raw_value = questions[/*lang*/ ctx[0]].list[/*qnc*/ ctx[2]].question + "";
    	let t6;
    	let div5;
    	let div1;
    	let t7;
    	let t8_value = questions[/*lang*/ ctx[0]].list[/*qnc*/ ctx[2]].options[0] + "";
    	let t8;
    	let t9;
    	let div2;
    	let t10;
    	let t11_value = questions[/*lang*/ ctx[0]].list[/*qnc*/ ctx[2]].options[1] + "";
    	let t11;
    	let t12;
    	let div3;
    	let t13;
    	let t14_value = questions[/*lang*/ ctx[0]].list[/*qnc*/ ctx[2]].options[2] + "";
    	let t14;
    	let t15;
    	let div4;
    	let t16;
    	let t17_value = questions[/*lang*/ ctx[0]].list[/*qnc*/ ctx[2]].options[3] + "";
    	let t17;
    	let section_intro;
    	let dispose;

    	const block = {
    		c: function create() {
    			section = element("section");
    			div0 = element("div");
    			ion_icon = element("ion-icon");
    			t0 = space();
    			span = element("span");
    			t1 = text("Question ");
    			t2 = text(t2_value);
    			t3 = text("/");
    			t4 = text(t4_value);
    			t5 = space();
    			p = element("p");
    			t6 = space();
    			div5 = element("div");
    			div1 = element("div");
    			t7 = text("A. ");
    			t8 = text(t8_value);
    			t9 = space();
    			div2 = element("div");
    			t10 = text("B. ");
    			t11 = text(t11_value);
    			t12 = space();
    			div3 = element("div");
    			t13 = text("C. ");
    			t14 = text(t14_value);
    			t15 = space();
    			div4 = element("div");
    			t16 = text("D. ");
    			t17 = text(t17_value);
    			set_custom_element_data(ion_icon, "name", "albums");
    			set_custom_element_data(ion_icon, "class", "svelte-129qqcr");
    			add_location(ion_icon, file, 91, 5, 2510);
    			attr_dev(span, "class", "svelte-129qqcr");
    			add_location(span, file, 92, 5, 2551);
    			attr_dev(div0, "class", "title svelte-129qqcr");
    			add_location(div0, file, 90, 4, 2485);
    			attr_dev(p, "class", "svelte-129qqcr");
    			add_location(p, file, 94, 4, 2626);
    			attr_dev(div1, "class", "option _A svelte-129qqcr");
    			add_location(div1, file, 96, 5, 2707);
    			attr_dev(div2, "class", "option _B svelte-129qqcr");
    			add_location(div2, file, 97, 5, 2812);
    			attr_dev(div3, "class", "option _C svelte-129qqcr");
    			add_location(div3, file, 98, 5, 2917);
    			attr_dev(div4, "class", "option _D svelte-129qqcr");
    			add_location(div4, file, 99, 5, 3022);
    			attr_dev(div5, "class", "options svelte-129qqcr");
    			add_location(div5, file, 95, 4, 2680);
    			attr_dev(section, "class", "question");
    			add_location(section, file, 89, 3, 2446);
    		},
    		m: function mount(target, anchor, remount) {
    			insert_dev(target, section, anchor);
    			append_dev(section, div0);
    			append_dev(div0, ion_icon);
    			append_dev(div0, t0);
    			append_dev(div0, span);
    			append_dev(span, t1);
    			append_dev(span, t2);
    			append_dev(span, t3);
    			append_dev(span, t4);
    			append_dev(section, t5);
    			append_dev(section, p);
    			p.innerHTML = raw_value;
    			append_dev(section, t6);
    			append_dev(section, div5);
    			append_dev(div5, div1);
    			append_dev(div1, t7);
    			append_dev(div1, t8);
    			append_dev(div5, t9);
    			append_dev(div5, div2);
    			append_dev(div2, t10);
    			append_dev(div2, t11);
    			append_dev(div5, t12);
    			append_dev(div5, div3);
    			append_dev(div3, t13);
    			append_dev(div3, t14);
    			append_dev(div5, t15);
    			append_dev(div5, div4);
    			append_dev(div4, t16);
    			append_dev(div4, t17);
    			if (remount) run_all(dispose);

    			dispose = [
    				listen_dev(div1, "click", /*click_handler_3*/ ctx[11], false, false, false),
    				listen_dev(div2, "click", /*click_handler_4*/ ctx[12], false, false, false),
    				listen_dev(div3, "click", /*click_handler_5*/ ctx[13], false, false, false),
    				listen_dev(div4, "click", /*click_handler_6*/ ctx[14], false, false, false)
    			];
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*qnc*/ 4 && t2_value !== (t2_value = /*qnc*/ ctx[2] + 1 + "")) set_data_dev(t2, t2_value);
    			if (dirty & /*lang*/ 1 && t4_value !== (t4_value = questions[/*lang*/ ctx[0]].list.length + "")) set_data_dev(t4, t4_value);
    			if (dirty & /*lang, qnc*/ 5 && raw_value !== (raw_value = questions[/*lang*/ ctx[0]].list[/*qnc*/ ctx[2]].question + "")) p.innerHTML = raw_value;			if (dirty & /*lang, qnc*/ 5 && t8_value !== (t8_value = questions[/*lang*/ ctx[0]].list[/*qnc*/ ctx[2]].options[0] + "")) set_data_dev(t8, t8_value);
    			if (dirty & /*lang, qnc*/ 5 && t11_value !== (t11_value = questions[/*lang*/ ctx[0]].list[/*qnc*/ ctx[2]].options[1] + "")) set_data_dev(t11, t11_value);
    			if (dirty & /*lang, qnc*/ 5 && t14_value !== (t14_value = questions[/*lang*/ ctx[0]].list[/*qnc*/ ctx[2]].options[2] + "")) set_data_dev(t14, t14_value);
    			if (dirty & /*lang, qnc*/ 5 && t17_value !== (t17_value = questions[/*lang*/ ctx[0]].list[/*qnc*/ ctx[2]].options[3] + "")) set_data_dev(t17, t17_value);
    		},
    		i: function intro(local) {
    			if (!section_intro) {
    				add_render_callback(() => {
    					section_intro = create_in_transition(section, fade, {});
    					section_intro.start();
    				});
    			}
    		},
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(section);
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_1.name,
    		type: "if",
    		source: "(89:2) {#if page == \\\"question\\\"}",
    		ctx
    	});

    	return block;
    }

    // (104:2) {#if page == "result"}
    function create_if_block(ctx) {
    	let section;
    	let div0;
    	let ion_icon0;
    	let t0;
    	let span0;
    	let t2;
    	let div1;
    	let span1;
    	let span2;
    	let t4_value = /*stats*/ ctx[4].c + "";
    	let t4;
    	let t5;
    	let div2;
    	let span3;
    	let span4;
    	let t7_value = /*stats*/ ctx[4].w + "";
    	let t7;
    	let t8;
    	let div3;
    	let ion_icon1;
    	let t9;
    	let span5;
    	let t10;
    	let t11;
    	let t12;
    	let div4;
    	let p;
    	let ion_icon2;
    	let t13;
    	let a;
    	let t14;
    	let a_href_value;
    	let section_transition;
    	let current;

    	const block = {
    		c: function create() {
    			section = element("section");
    			div0 = element("div");
    			ion_icon0 = element("ion-icon");
    			t0 = space();
    			span0 = element("span");
    			span0.textContent = "Test Result";
    			t2 = space();
    			div1 = element("div");
    			span1 = element("span");
    			span1.textContent = "Your correct answers : ";
    			span2 = element("span");
    			t4 = text(t4_value);
    			t5 = space();
    			div2 = element("div");
    			span3 = element("span");
    			span3.textContent = "Your wrong answers : ";
    			span4 = element("span");
    			t7 = text(t7_value);
    			t8 = space();
    			div3 = element("div");
    			ion_icon1 = element("ion-icon");
    			t9 = text("You are at the ");
    			span5 = element("span");
    			t10 = text(/*level*/ ctx[5]);
    			t11 = text(" level.");
    			t12 = space();
    			div4 = element("div");
    			p = element("p");
    			ion_icon2 = element("ion-icon");
    			t13 = text("Share your result via ");
    			a = element("a");
    			t14 = text("Email");
    			set_custom_element_data(ion_icon0, "name", "school");
    			set_custom_element_data(ion_icon0, "class", "svelte-129qqcr");
    			add_location(ion_icon0, file, 106, 5, 3253);
    			attr_dev(span0, "class", "svelte-129qqcr");
    			add_location(span0, file, 107, 5, 3294);
    			attr_dev(div0, "class", "title svelte-129qqcr");
    			add_location(div0, file, 105, 4, 3228);
    			attr_dev(span1, "class", "correct svelte-129qqcr");
    			add_location(span1, file, 110, 5, 3356);
    			attr_dev(span2, "class", "num c svelte-129qqcr");
    			add_location(span2, file, 110, 57, 3408);
    			attr_dev(div1, "class", "rs svelte-129qqcr");
    			add_location(div1, file, 109, 4, 3334);
    			attr_dev(span3, "class", "wrong svelte-129qqcr");
    			add_location(span3, file, 113, 5, 3482);
    			attr_dev(span4, "class", "num w svelte-129qqcr");
    			add_location(span4, file, 113, 53, 3530);
    			attr_dev(div2, "class", "rs svelte-129qqcr");
    			add_location(div2, file, 112, 4, 3460);
    			set_custom_element_data(ion_icon1, "name", "medal");
    			set_custom_element_data(ion_icon1, "class", "svelte-129qqcr");
    			add_location(ion_icon1, file, 115, 23, 3602);
    			attr_dev(span5, "class", "highlight svelte-129qqcr");
    			add_location(span5, file, 115, 72, 3651);
    			attr_dev(div3, "class", "level svelte-129qqcr");
    			add_location(div3, file, 115, 4, 3583);
    			set_custom_element_data(ion_icon2, "name", "mail");
    			set_custom_element_data(ion_icon2, "class", "svelte-129qqcr");
    			add_location(ion_icon2, file, 117, 8, 3735);
    			attr_dev(a, "href", a_href_value = "mailto:hayatemooon@gmail.com?\n\t\t\t\t\t\tsubject=Hayatemoon Language Placemenet Test Result\n\t\t\t\t\t\t&body=" + encodeURIComponent(`Hello, my name is '${/*name*/ ctx[3]}' and i just took place in language placement test in ${/*lang*/ ctx[0]} language and answered correctly to ${/*stats*/ ctx[4].c} out of ${questions[/*lang*/ ctx[0]].list.length} and earned ${/*level*/ ctx[5]} level.`));
    			set_style(a, "color", "#F48FB1");
    			add_location(a, file, 117, 63, 3790);
    			attr_dev(p, "class", "svelte-129qqcr");
    			add_location(p, file, 117, 5, 3732);
    			attr_dev(div4, "class", "share");
    			add_location(div4, file, 116, 4, 3707);
    			attr_dev(section, "class", "result");
    			add_location(section, file, 104, 3, 3183);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, section, anchor);
    			append_dev(section, div0);
    			append_dev(div0, ion_icon0);
    			append_dev(div0, t0);
    			append_dev(div0, span0);
    			append_dev(section, t2);
    			append_dev(section, div1);
    			append_dev(div1, span1);
    			append_dev(div1, span2);
    			append_dev(span2, t4);
    			append_dev(section, t5);
    			append_dev(section, div2);
    			append_dev(div2, span3);
    			append_dev(div2, span4);
    			append_dev(span4, t7);
    			append_dev(section, t8);
    			append_dev(section, div3);
    			append_dev(div3, ion_icon1);
    			append_dev(div3, t9);
    			append_dev(div3, span5);
    			append_dev(span5, t10);
    			append_dev(div3, t11);
    			append_dev(section, t12);
    			append_dev(section, div4);
    			append_dev(div4, p);
    			append_dev(p, ion_icon2);
    			append_dev(p, t13);
    			append_dev(p, a);
    			append_dev(a, t14);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if ((!current || dirty & /*stats*/ 16) && t4_value !== (t4_value = /*stats*/ ctx[4].c + "")) set_data_dev(t4, t4_value);
    			if ((!current || dirty & /*stats*/ 16) && t7_value !== (t7_value = /*stats*/ ctx[4].w + "")) set_data_dev(t7, t7_value);
    			if (!current || dirty & /*level*/ 32) set_data_dev(t10, /*level*/ ctx[5]);

    			if (!current || dirty & /*name, lang, stats, level*/ 57 && a_href_value !== (a_href_value = "mailto:hayatemooon@gmail.com?\n\t\t\t\t\t\tsubject=Hayatemoon Language Placemenet Test Result\n\t\t\t\t\t\t&body=" + encodeURIComponent(`Hello, my name is '${/*name*/ ctx[3]}' and i just took place in language placement test in ${/*lang*/ ctx[0]} language and answered correctly to ${/*stats*/ ctx[4].c} out of ${questions[/*lang*/ ctx[0]].list.length} and earned ${/*level*/ ctx[5]} level.`))) {
    				attr_dev(a, "href", a_href_value);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;

    			add_render_callback(() => {
    				if (!section_transition) section_transition = create_bidirectional_transition(section, fade, {}, true);
    				section_transition.run(1);
    			});

    			current = true;
    		},
    		o: function outro(local) {
    			if (!section_transition) section_transition = create_bidirectional_transition(section, fade, {}, false);
    			section_transition.run(0);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(section);
    			if (detaching && section_transition) section_transition.end();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block.name,
    		type: "if",
    		source: "(104:2) {#if page == \\\"result\\\"}",
    		ctx
    	});

    	return block;
    }

    function create_fragment(ctx) {
    	let main;
    	let div6;
    	let div1;
    	let div0;
    	let t0;
    	let div3;
    	let div2;
    	let t1;
    	let div5;
    	let div4;
    	let t2;
    	let div7;
    	let t3;
    	let t4;
    	let t5;
    	let div8;
    	let t6;
    	let b;
    	let t8;
    	let current;
    	let if_block0 = /*page*/ ctx[1] == "landing" && create_if_block_2(ctx);
    	let if_block1 = /*page*/ ctx[1] == "question" && create_if_block_1(ctx);
    	let if_block2 = /*page*/ ctx[1] == "result" && create_if_block(ctx);

    	const block = {
    		c: function create() {
    			main = element("main");
    			div6 = element("div");
    			div1 = element("div");
    			div0 = element("div");
    			t0 = space();
    			div3 = element("div");
    			div2 = element("div");
    			t1 = space();
    			div5 = element("div");
    			div4 = element("div");
    			t2 = space();
    			div7 = element("div");
    			if (if_block0) if_block0.c();
    			t3 = space();
    			if (if_block1) if_block1.c();
    			t4 = space();
    			if (if_block2) if_block2.c();
    			t5 = space();
    			div8 = element("div");
    			t6 = text("Designed And Created By ");
    			b = element("b");
    			b.textContent = "Sarv";
    			t8 = text(" Team");
    			attr_dev(div0, "class", "wave waveTop svelte-129qqcr");
    			set_style(div0, "background-image", "url('http://front-end-noobs.com/jecko/img/wave-top.png')");
    			add_location(div0, file, 48, 3, 871);
    			attr_dev(div1, "class", "waveWrapperInner bgTop svelte-129qqcr");
    			add_location(div1, file, 47, 2, 831);
    			attr_dev(div2, "class", "wave waveMiddle svelte-129qqcr");
    			set_style(div2, "background-image", "url('http://front-end-noobs.com/jecko/img/wave-mid.png')");
    			add_location(div2, file, 51, 3, 1041);
    			attr_dev(div3, "class", "waveWrapperInner bgMiddle svelte-129qqcr");
    			add_location(div3, file, 50, 2, 998);
    			attr_dev(div4, "class", "wave waveBottom svelte-129qqcr");
    			set_style(div4, "background-image", "url('http://front-end-noobs.com/jecko/img/wave-bot.png')");
    			add_location(div4, file, 54, 3, 1214);
    			attr_dev(div5, "class", "waveWrapperInner bgBottom svelte-129qqcr");
    			add_location(div5, file, 53, 2, 1171);
    			attr_dev(div6, "class", "waveWrapper waveAnimation svelte-129qqcr");
    			add_location(div6, file, 46, 1, 789);
    			attr_dev(div7, "class", "box svelte-129qqcr");
    			add_location(div7, file, 57, 1, 1351);
    			attr_dev(b, "class", "svelte-129qqcr");
    			add_location(b, file, 124, 41, 4241);
    			attr_dev(div8, "class", "tm svelte-129qqcr");
    			add_location(div8, file, 124, 1, 4201);
    			add_location(main, file, 45, 0, 781);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, main, anchor);
    			append_dev(main, div6);
    			append_dev(div6, div1);
    			append_dev(div1, div0);
    			append_dev(div6, t0);
    			append_dev(div6, div3);
    			append_dev(div3, div2);
    			append_dev(div6, t1);
    			append_dev(div6, div5);
    			append_dev(div5, div4);
    			append_dev(main, t2);
    			append_dev(main, div7);
    			if (if_block0) if_block0.m(div7, null);
    			append_dev(div7, t3);
    			if (if_block1) if_block1.m(div7, null);
    			append_dev(div7, t4);
    			if (if_block2) if_block2.m(div7, null);
    			append_dev(main, t5);
    			append_dev(main, div8);
    			append_dev(div8, t6);
    			append_dev(div8, b);
    			append_dev(div8, t8);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (/*page*/ ctx[1] == "landing") {
    				if (if_block0) {
    					if_block0.p(ctx, dirty);
    				} else {
    					if_block0 = create_if_block_2(ctx);
    					if_block0.c();
    					if_block0.m(div7, t3);
    				}
    			} else if (if_block0) {
    				if_block0.d(1);
    				if_block0 = null;
    			}

    			if (/*page*/ ctx[1] == "question") {
    				if (if_block1) {
    					if_block1.p(ctx, dirty);

    					if (dirty & /*page*/ 2) {
    						transition_in(if_block1, 1);
    					}
    				} else {
    					if_block1 = create_if_block_1(ctx);
    					if_block1.c();
    					transition_in(if_block1, 1);
    					if_block1.m(div7, t4);
    				}
    			} else if (if_block1) {
    				if_block1.d(1);
    				if_block1 = null;
    			}

    			if (/*page*/ ctx[1] == "result") {
    				if (if_block2) {
    					if_block2.p(ctx, dirty);

    					if (dirty & /*page*/ 2) {
    						transition_in(if_block2, 1);
    					}
    				} else {
    					if_block2 = create_if_block(ctx);
    					if_block2.c();
    					transition_in(if_block2, 1);
    					if_block2.m(div7, null);
    				}
    			} else if (if_block2) {
    				group_outros();

    				transition_out(if_block2, 1, 1, () => {
    					if_block2 = null;
    				});

    				check_outros();
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block1);
    			transition_in(if_block2);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block2);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(main);
    			if (if_block0) if_block0.d();
    			if (if_block1) if_block1.d();
    			if (if_block2) if_block2.d();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance($$self, $$props, $$invalidate) {
    	let lang = "english";
    	let page = "landing";
    	let qnc = 0;
    	let name = "";
    	let stats = { c: 0, w: 0 };

    	function answer(o) {
    		questions[lang].list[qnc].doAnswer(o);

    		if (questions[lang].list[qnc].correct) {
    			$$invalidate(4, stats.c++, stats);
    		} else {
    			$$invalidate(4, stats.w++, stats);
    		}

    		if (qnc < questions[lang].list.length - 1) {
    			$$invalidate(2, qnc++, qnc);
    		} else {
    			$$invalidate(1, page = "result");
    		}
    	}

    	let level = "Starter";
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<App> was created with unknown prop '${key}'`);
    	});

    	let { $$slots = {}, $$scope } = $$props;
    	validate_slots("App", $$slots, []);
    	const click_handler = () => $$invalidate(0, lang = "english");
    	const click_handler_1 = () => $$invalidate(0, lang = "turkish");

    	function input_input_handler() {
    		name = this.value;
    		$$invalidate(3, name);
    	}

    	const click_handler_2 = () => {
    		if (name != "") $$invalidate(1, page = "question");
    	};

    	const click_handler_3 = () => {
    		answer(0);
    	};

    	const click_handler_4 = () => {
    		answer(1);
    	};

    	const click_handler_5 = () => {
    		answer(2);
    	};

    	const click_handler_6 = () => {
    		answer(3);
    	};

    	$$self.$capture_state = () => ({
    		fade,
    		fly,
    		Questions: questions,
    		lang,
    		page,
    		qnc,
    		name,
    		stats,
    		answer,
    		level
    	});

    	$$self.$inject_state = $$props => {
    		if ("lang" in $$props) $$invalidate(0, lang = $$props.lang);
    		if ("page" in $$props) $$invalidate(1, page = $$props.page);
    		if ("qnc" in $$props) $$invalidate(2, qnc = $$props.qnc);
    		if ("name" in $$props) $$invalidate(3, name = $$props.name);
    		if ("stats" in $$props) $$invalidate(4, stats = $$props.stats);
    		if ("level" in $$props) $$invalidate(5, level = $$props.level);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*stats*/ 16) {
    			 {
    				if (stats.c > 5) {
    					$$invalidate(5, level = "Elementary");
    				}

    				if (stats.c > 10) {
    					$$invalidate(5, level = "Pre-Intermediate");
    				}

    				if (stats.c > 15) {
    					$$invalidate(5, level = "Intermediate");
    				}

    				if (stats.c > 20) {
    					$$invalidate(5, level = "Upper-Intermediate");
    				}

    				if (stats.c > 24) {
    					$$invalidate(5, level = "Advanced");
    				}
    			}
    		}
    	};

    	return [
    		lang,
    		page,
    		qnc,
    		name,
    		stats,
    		level,
    		answer,
    		click_handler,
    		click_handler_1,
    		input_input_handler,
    		click_handler_2,
    		click_handler_3,
    		click_handler_4,
    		click_handler_5,
    		click_handler_6
    	];
    }

    class App extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance, create_fragment, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "App",
    			options,
    			id: create_fragment.name
    		});
    	}
    }

    const app = new App({
    	target: document.body,
    });

    return app;

}());
//# sourceMappingURL=bundle.js.map
