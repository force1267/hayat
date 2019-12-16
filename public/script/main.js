
var lang = 0; // 0 => fa, 1 => tr, 2 => en

var map = {
    dic: {
        'class': ['دسته بندی', '', ''],
        'city': ['شهر', '', ''],
        'price': ['قیمت', '', ''],
        'areaOfBuilding': ['متراژ', '', ''],
        'ageOfBulding': ['سن بنا', '', ''],
        'numberOfRooms': ['تعداد اتاق', '', ''],
        'deposits': ['ودیعه', '', ''],
        'rent': ['اجاره', '', ''],
        'manufacturer': ['سازنده', '', ''],
        'kilometers': ['کارکرد', '', ''],
    },
    'فروشی_مسکونی': {
        fields: [
            {
                name: 'areaOfBuilding',
                type: 'range',
                input: 'int',
                from: ['از', '', 'from'],
                to: ['تا', '', 'to'],
                caption: ['متراژ - متر مربع', '', ''],
            },
            {
                name: 'ageOfBulding',
                type: 'range-list',
                input: 'int',
                list: (function() {
                    let out = [];
                    for (let i = 1;i < 50;i++) {
                        out.push(i);
                    }
                    out.push(['&#8734;', 1000]);
                    return out;
                })(),
                from: ['از ', '', 'from'],
                to: ['تا ', '', 'to'],
                caption: ['سن بنا', '', ''],
            },
            // {
            //     name: 'requesting',
            //     type: 'option',
            //     input: 'option',
            //     options: [
            //         ['فروشی', '', ''],
            //         ['درخواستی', '', ''],
            //     ],
            //     caption: ['نوع', '', ''],
            // },
            {
                name: 'numberOfRooms',
                type: 'int',
                input: 'int',
                caption: ['تعداد اتاق', '', 'minimum number of rooms'],
            },
            {
                name: 'price',
                type: 'range-list',
                input: 'int',
                list: [
                    ['200 ملیون', 200],
                    ['300 ملیون', 300],
                    ['450 ملیون', 400],
                    ['600 ملیون', 600],
                    ['750 ملیون', 750],
                    ['900 ملیون', 900],
                    ['1 میلیارد و 250', 1250000000],
                    ['1 میلیارد و 450', 1450000000],
                    ['1 میلیارد و 900', 1900000000],
                    ['2 میلیارد', 2000000000],
                    ['3 میلیارد', 3000000000],
                    ['5 میلیارد', 5000000000],
                    ['10 میلیارد', 10000000000],
                    ['&#8734;', Infinity],
                ],
                from: ['از ', '', 'from'],
                to: ['تا ', '', 'to'],
                caption: ['قیمت', '', 'price'],
            },
        ],
    },
    'اجاره_مسکونی': {
        fields: [
            {
                name: 'areaOfBuilding',
                type: 'range',
                input: 'int',
                from: ['از', '', 'from'],
                to: ['تا', '', 'to'],
                caption: ['متراژ - متر مربع', '', ''],
            },
            {
                name: 'ageOfBulding',
                type: 'range-list',
                input: 'int',
                list: (function() {
                    let out = [];
                    for (let i = 1;i < 50;i++) {
                        out.push(i);
                    }
                    out.push(['&#8734;', 1000]);
                    return out;
                })(),
                from: ['از ', '', 'from'],
                to: ['تا ', '', 'to'],
                caption: ['سن بنا', '', ''],
            },
            {
                name: 'numberOfRooms',
                type: 'int',
                input: 'int',
                caption: ['تعداد اتاق', '', 'minimum number of rooms'],
            },
            {
                name: 'deposits',
                type: 'range',
                input: 'int',
                from: ['از ', '', 'from'],
                to: ['تا ', '', 'to'],
                caption: ['ودیعه (تومان)', '', 'deposits'],
            },
            {
                name: 'rent',
                type: 'range',
                input: 'int',
                from: ['از ', '', 'from'],
                to: ['تا ', '', 'to'],
                caption: ['اجاره (تومان)', '', 'rent'],
            },
        ],
    },
    'فروشی_تجاری': {
        fields: [
            {
                name: 'areaOfBuilding',
                type: 'range',
                input: 'int',
                from: ['از', '', 'from'],
                to: ['تا', '', 'to'],
                caption: ['متراژ - متر مربع', '', ''],
            },
            {
                name: 'ageOfBulding',
                type: 'range-list',
                input: 'int',
                list: (function() {
                    let out = [];
                    for (let i = 1;i < 50;i++) {
                        out.push(i);
                    }
                    out.push(['&#8734;', 1000]);
                    return out;
                })(),
                from: ['از ', '', 'from'],
                to: ['تا ', '', 'to'],
                caption: ['سن بنا', '', ''],
            },
            {
                name: 'price',
                type: 'range-list',
                input: 'int',
                list: [
                    ['200 ملیون', 200],
                    ['300 ملیون', 300],
                    ['450 ملیون', 400],
                    ['600 ملیون', 600],
                    ['750 ملیون', 750],
                    ['900 ملیون', 900],
                    ['1 میلیارد و 250', 1250000000],
                    ['1 میلیارد و 450', 1450000000],
                    ['1 میلیارد و 900', 1900000000],
                    ['2 میلیارد', 2000000000],
                    ['3 میلیارد', 3000000000],
                    ['5 میلیارد', 5000000000],
                    ['10 میلیارد', 10000000000],
                    ['&#8734;', Infinity],
                ],
                from: ['از ', '', 'from'],
                to: ['تا ', '', 'to'],
                caption: ['قیمت', '', 'price'],
            },
        ],
    },
    'اجاره_تجاری': {
        fields: [
            {
                name: 'areaOfBuilding',
                type: 'range',
                input: 'int',
                from: ['از', '', 'from'],
                to: ['تا', '', 'to'],
                caption: ['متراژ - متر مربع', '', ''],
            },
            {
                name: 'ageOfBulding',
                type: 'range-list',
                input: 'int',
                list: (function() {
                    let out = [];
                    for (let i = 1;i < 50;i++) {
                        out.push(i);
                    }
                    out.push(['&#8734;', 1000]);
                    return out;
                })(),
                from: ['از ', '', 'from'],
                to: ['تا ', '', 'to'],
                caption: ['سن بنا', '', ''],
            },
            {
                name: 'numberOfRooms',
                type: 'int',
                input: 'int',
                caption: ['تعداد اتاق', '', 'minimum number of rooms'],
            },
            {
                name: 'deposits',
                type: 'range',
                input: 'int',
                from: ['از ', '', 'from'],
                to: ['تا ', '', 'to'],
                caption: ['ودیعه (تومان)', '', 'deposits'],
            },
            {
                name: 'rent',
                type: 'range',
                input: 'int',
                from: ['از ', '', 'from'],
                to: ['تا ', '', 'to'],
                caption: ['اجاره (تومان)', '', 'rent'],
            },
        ],
    },
    'خودرو': {
        fields: [
            {
                name: 'manufacturer',
                type: 'list',
                input: 'list',
                list: ['پراید', 'سمند', 'پژو'],
                caption: ['برند', '', 'brand'],
            },
            {
                name: 'kilometers',
                type: 'range',
                input: 'int',
                from: ['از ', '', 'from'],
                to: ['تا ', '', 'to'],
                caption: ['کارکرد (کیلومتر)', '', ''],
            },
            {
                name: 'price',
                type: 'range',
                input: 'int',
                from: ['از ', '', 'from'],
                to: ['تا ', '', 'to'],
                caption: ['قیمت (تومان)', '', 'rent'],
            },
        ],
    },
    'لوازم_يدكي_خودرو': {
        fields: [
            {
                name: 'price',
                type: 'range',
                input: 'int',
                from: ['از ', '', 'from'],
                to: ['تا ', '', 'to'],
                caption: ['قیمت (تومان)', '', 'rent'],
            },
        ],
    },
    'موتور_سیکلت_و_لوازم_یدکی': {
        fields: [
            {
                name: 'price',
                type: 'range',
                input: 'int',
                from: ['از ', '', 'from'],
                to: ['تا ', '', 'to'],
                caption: ['قیمت (تومان)', '', 'rent'],
            },
        ],
    },
    'لپتاپ_و_كامپيوتر': {
        fields: [
            {
                name: 'manufacturer',
                type: 'list',
                input: 'list',
                list: ['دل', 'ایسوز', 'پژو'],
                caption: ['برند', '', 'اپل'],
            },
            {
                name: 'price',
                type: 'range',
                input: 'int',
                from: ['از ', '', 'from'],
                to: ['تا ', '', 'to'],
                caption: ['قیمت (تومان)', '', 'rent'],
            },
        ],
    },
    'دوربين_فيلم_برداري_و_عكاسي_و_ملزومات': {
        fields: [
            {
                name: 'price',
                type: 'range',
                input: 'int',
                from: ['از ', '', 'from'],
                to: ['تا ', '', 'to'],
                caption: ['قیمت (تومان)', '', 'rent'],
            },
        ],
    },
    'صوتي_و_تصويري': {
        fields: [
            {
                name: 'price',
                type: 'range',
                input: 'int',
                from: ['از ', '', 'from'],
                to: ['تا ', '', 'to'],
                caption: ['قیمت (تومان)', '', 'rent'],
            },
        ],
    },
    'موبايل_و_تبلت_و_ملزومات': {
        fields: [
            {
                name: 'price',
                type: 'range',
                input: 'int',
                from: ['از ', '', 'from'],
                to: ['تا ', '', 'to'],
                caption: ['قیمت (تومان)', '', 'rent'],
            },
        ],
    },
    'كنسول_بازي_و_ملزومات': {
        fields: [
            {
                name: 'price',
                type: 'range',
                input: 'int',
                from: ['از ', '', 'from'],
                to: ['تا ', '', 'to'],
                caption: ['قیمت (تومان)', '', 'rent'],
            },
        ],
    },
    'ساير_لوازم_الكترونيكي': {
        fields: [
            {
                name: 'price',
                type: 'range',
                input: 'int',
                from: ['از ', '', 'from'],
                to: ['تا ', '', 'to'],
                caption: ['قیمت (تومان)', '', 'rent'],
            },
        ],
    },
    'آشپز_و_شيريني_پز': {
        fields: [
            {
                name: 'price',
                type: 'range',
                input: 'int',
                from: ['از ', '', 'from'],
                to: ['تا ', '', 'to'],
                caption: ['قیمت (تومان)', '', 'rent'],
            },
        ],
    },
    'نظافت': {
        fields: [
            {
                name: 'price',
                type: 'range',
                input: 'int',
                from: ['از ', '', 'from'],
                to: ['تا ', '', 'to'],
                caption: ['قیمت (تومان)', '', 'rent'],
            },
        ],
    },
    'عمران_ساختماني_و_معماري': {
        fields: [
            {
                name: 'price',
                type: 'range',
                input: 'int',
                from: ['از ', '', 'from'],
                to: ['تا ', '', 'to'],
                caption: ['قیمت (تومان)', '', 'rent'],
            },
        ],
    },
    'خدمات_رستوران_و_فروشگاه': {
        fields: [
            {
                name: 'price',
                type: 'range',
                input: 'int',
                from: ['از ', '', 'from'],
                to: ['تا ', '', 'to'],
                caption: ['قیمت (تومان)', '', 'rent'],
            },
        ],
    },
    'آموزش': {
        fields: [
            {
                name: 'price',
                type: 'range',
                input: 'int',
                from: ['از ', '', 'from'],
                to: ['تا ', '', 'to'],
                caption: ['قیمت (تومان)', '', 'rent'],
            },
        ],
    },
    'رسانه_و_ماركتينگ_و_گرافيست': {
        fields: [
            {
                name: 'price',
                type: 'range',
                input: 'int',
                from: ['از ', '', 'from'],
                to: ['تا ', '', 'to'],
                caption: ['قیمت (تومان)', '', 'rent'],
            },
        ],
    },
    'حسابداري_مالي_حقوقي': {
        fields: [
            {
                name: 'price',
                type: 'range',
                input: 'int',
                from: ['از ', '', 'from'],
                to: ['تا ', '', 'to'],
                caption: ['قیمت (تومان)', '', 'rent'],
            },
        ],
    },
    'رسانه_و_ماركتينگ_و_گرافيست': {
        fields: [
            {
                name: 'price',
                type: 'range',
                input: 'int',
                from: ['از ', '', 'from'],
                to: ['تا ', '', 'to'],
                caption: ['قیمت (تومان)', '', 'rent'],
            },
        ],
    },
    'بازاريابي_و_فروش': {
        fields: [
            {
                name: 'price',
                type: 'range',
                input: 'int',
                from: ['از ', '', 'from'],
                to: ['تا ', '', 'to'],
                caption: ['قیمت (تومان)', '', 'rent'],
            },
        ],
    },
    'درماني_زيبايي_و_بهداشتي': {
        fields: [
            {
                name: 'price',
                type: 'range',
                input: 'int',
                from: ['از ', '', 'from'],
                to: ['تا ', '', 'to'],
                caption: ['قیمت (تومان)', '', 'rent'],
            },
        ],
    },
    'رايانه_و_IT': {
        fields: [
            {
                name: 'price',
                type: 'range',
                input: 'int',
                from: ['از ', '', 'from'],
                to: ['تا ', '', 'to'],
                caption: ['قیمت (تومان)', '', 'rent'],
            },
        ],
    },
    'حمل_و_نقل': {
        fields: [
            {
                name: 'price',
                type: 'range',
                input: 'int',
                from: ['از ', '', 'from'],
                to: ['تا ', '', 'to'],
                caption: ['قیمت (تومان)', '', 'rent'],
            },
        ],
    },
    'صنعت_و_مهندسي': {
        fields: [
            {
                name: 'price',
                type: 'range',
                input: 'int',
                from: ['از ', '', 'from'],
                to: ['تا ', '', 'to'],
                caption: ['قیمت (تومان)', '', 'rent'],
            },
        ],
    },
    'مهاجرتي': {
        fields: [
            {
                name: 'price',
                type: 'range',
                input: 'int',
                from: ['از ', '', 'from'],
                to: ['تا ', '', 'to'],
                caption: ['قیمت (تومان)', '', 'rent'],
            },
        ],
    },
    'رافي': {
        fields: [
            {
                name: 'price',
                type: 'range',
                input: 'int',
                from: ['از ', '', 'from'],
                to: ['تا ', '', 'to'],
                caption: ['قیمت (تومان)', '', 'rent'],
            },
        ],
    },
    'آرايشگري': {
        fields: [
            {
                name: 'price',
                type: 'range',
                input: 'int',
                from: ['از ', '', 'from'],
                to: ['تا ', '', 'to'],
                caption: ['قیمت (تومان)', '', 'rent'],
            },
        ],
    },
    'طراحي_سايت_و_شبكه': {
        fields: [
            {
                name: 'price',
                type: 'range',
                input: 'int',
                from: ['از ', '', 'from'],
                to: ['تا ', '', 'to'],
                caption: ['قیمت (تومان)', '', 'rent'],
            },
        ],
    },
    'ترجمه': {
        fields: [
            {
                name: 'price',
                type: 'range',
                input: 'int',
                from: ['از ', '', 'from'],
                to: ['تا ', '', 'to'],
                caption: ['قیمت (تومان)', '', 'rent'],
            },
        ],
    },
    'تعميرات': {
        fields: [
            {
                name: 'price',
                type: 'range',
                input: 'int',
                from: ['از ', '', 'from'],
                to: ['تا ', '', 'to'],
                caption: ['قیمت (تومان)', '', 'rent'],
            },
        ],
    },
    'ساير_خدمات': {
        fields: [
            {
                name: 'price',
                type: 'range',
                input: 'int',
                from: ['از ', '', 'from'],
                to: ['تا ', '', 'to'],
                caption: ['قیمت (تومان)', '', 'rent'],
            },
        ],
    },
    'اجاره_خودرو': {
        fields: [
            {
                name: 'price',
                type: 'range',
                input: 'int',
                from: ['از ', '', 'from'],
                to: ['تا ', '', 'to'],
                caption: ['قیمت (تومان)', '', 'rent'],
            },
        ],
    },
    'مبلمان_وسايل_و_ترئينات_خانه': {
        fields: [
            {
                name: 'price',
                type: 'range',
                input: 'int',
                from: ['از ', '', 'from'],
                to: ['تا ', '', 'to'],
                caption: ['قیمت (تومان)', '', 'rent'],
            },
        ],
    },
    'لوازم_آشپزخونه': {
        fields: [
            {
                name: 'price',
                type: 'range',
                input: 'int',
                from: ['از ', '', 'from'],
                to: ['تا ', '', 'to'],
                caption: ['قیمت (تومان)', '', 'rent'],
            },
        ],
    },
    'دكوري_و_روشنايي': {
        fields: [
            {
                name: 'price',
                type: 'range',
                input: 'int',
                from: ['از ', '', 'from'],
                to: ['تا ', '', 'to'],
                caption: ['قیمت (تومان)', '', 'rent'],
            },
        ],
    },
    'فرش_و_گليم_و_قاليچه': {
        fields: [
            {
                name: 'price',
                type: 'range',
                input: 'int',
                from: ['از ', '', 'from'],
                to: ['تا ', '', 'to'],
                caption: ['قیمت (تومان)', '', 'rent'],
            },
        ],
    },
    'باغچه_و_حياط': {
        fields: [
            {
                name: 'price',
                type: 'range',
                input: 'int',
                from: ['از ', '', 'from'],
                to: ['تا ', '', 'to'],
                caption: ['قیمت (تومان)', '', 'rent'],
            },
        ],
    },
    'ساير_وسايل': {
        fields: [
            {
                name: 'price',
                type: 'range',
                input: 'int',
                from: ['از ', '', 'from'],
                to: ['تا ', '', 'to'],
                caption: ['قیمت (تومان)', '', 'rent'],
            },
        ],
    },
}


$('body').on('click', '.register', function() {
    let data = {'submitted': true};
    $(this).parent().find('input, textarea').each(function() {
        data[$(this).attr('id')] = $(this).val();
    });
    strapi.advertise.create(data).then((buff) => {
        strapi.advertise.upload($(this).parent().find('#file')[0], buff.id).then(res=> {
            alert('آگهی شما با موفقیت ثبت شد !');
        }).catch(e=> {
            alert('مشکلی در ثبت آگهی به وجود آمده است !');
            console.log(e)
        });
        $('.closev').trigger('click');
    });
});

$('.panel-collapse.collapse a').click(function() {
    let name = $(this).attr('href').split('#')[1];
    let self = this;
    $(this).parent().parent().parent().find('.panel-body').html('');
    $(this).parent().parent().parent().find('.panel-body').append(`
        <input type="hidden" id="class" value="${name}">
        <div class="field">
            <div class="title">شهر</div>
            <div class="select col-md-5">
                <span class="placeholder">مبدا</span>
                <ul>
                    <li data-value="استانبول">استانبول</li>
                    <li data-value="آنتاليا">آنتاليا</li>
                    <li data-value="آنكارا">آنكارا </li>
                    <li data-value="ازمير">ازمير</li>
                    <li data-value="دنيزلي">دنيزلي</li>
                    <li data-value="ونكوور">ونكوور </li>
                    <li data-value="تورونتو">تورونتو </li>
                    <li data-value="دوبي">دوبي  </li>
                    <li data-value="لندن">لندن </li>
                    <li data-value="ونكوور">ونكوور </li>
                    <li data-value="منچستر">منچستر </li>
                    <li data-value="نيوكاسل">نيوكاسل </li>
                    <li data-value="ليورپول">ليورپول </li>
                    <li data-value="ناتينگها">ناتينگها </li>
                    <li data-value="سيدني">سيدني </li>
                    <li data-value="ملبورن">ملبورن  </li>
                    <li data-value="تفليس">تفليس </li>
                </ul>
                <input type="hidden" required id="city" />
            </div>
            <div class="clear"></div>
        </div>
        <div class="field">
            <div class="title">عکس آگهی</div>
            <div class="info">افزودنِ عکس بازدید آگهی شما را تا سه برابر افزایش می‌دهد.</div>
            <p class="file">
                <label for="file" id="upl">افزودن عکس <i class="material-icons">add</i></label>
                <input id="file" type="file" multiple>
            </p>
            <div class="upi">
                <!-- <span>
                    <img src="/assets/images/adv.jpg">
                    <i class="material-icons">close</i>
                </span> -->
                <div class="clear"></div>
            </div>
        </div>
    `);
    map[name].fields.forEach(function(field) {
        switch (field.input) {
            case 'int': {
                $(self).parent().parent().parent().find('.panel-body').append(`
                    <div class="field">
                        <div class="title">${field.caption[lang]}</div>
                        <input type="text" id="${field.name}" required placeholder="...">
                        <div class="clear"></div>
                    </div>
                `);
                break;
            }
            case 'list': {
                let s = (a) => {
                    let o = "";
                    a.forEach((x) => {
                        let y;
                        if (typeof(x) == 'object') {
                            y = x[1];
                            x = x[0];
                        } else {
                            y = x;
                        }
                        o += `<li data-value="${y}">${x}</li>`;
                    });
                    return o;
                }
                $(self).parent().parent().parent().find('.panel-body').append(`
                    <div class="field">
                        <div class="title">${field.caption[lang]}</div>
                        <div class="select col-md-5">
                            <span class="placeholder">...</span>
                            <ul>
                                ${s(field.list)}
                            </ul>
                            <input type="hidden" required id="${field.name}" />
                        </div>
                        <div class="clear"></div>
                    </div>
                `);
                break;
            }
        }
    });
    $(this).parent().parent().parent().find('.panel-body').append(`
        <div class="field">
            <div class="title">شمارهٔ موبایل</div>
            <div class="info">توجه: لطفاً پس از ثبت آگهی، از طریق هیچ پیامکی برای پرداخت وجه جهت انتشار آگهی اقدام نکنید.د تأیید به شمارهٔ موبایل شما ارسال خواهد شد. تماس و چت نیز با این شماره انجام می‌شود.</div>
            <input type="text" id="phone" placeholder="شماره موبایل معتبر">
            <div class="clear"></div>
        </div>
        <div class="field">
            <div class="title">عنوان</div>
            <div class="info">در عنوان آگهی به موارد مهم و چشمگیر اشاره کنید.</div>
            <input type="text" id="title" placeholder="...">
            <div class="clear"></div>
        </div>
        <div class="field">
            <div class="title">توضیحات آگهی</div>
            <div class="info">جزئیات و نکات قابل توجه آگهی خود را کامل و دقیق بنویسید تا شانس موفقیت آگهی شما بیشتر شود.</div>
            <textarea id="description"></textarea>
            <div class="clear"></div>
        </div>
        <button class="register" id="submit">ثبت آگهی</button>
    `);
    // if ($('#upl').length) {
    //     new AjaxUpload('upl', {
    //         action: '/ad/add/image',
    //         name: 'file',
    //         data: {
    //             id: id
    //         },
    //         onComplete: function(file, response) {
    //             $('.upi').prepend(`
    //                 <span>
    //                     <img src="/ad/image/${response}">
    //                     <i class="material-icons">close</i>
    //                 </span>
    //             `);
    //         }
    //     });
    // }

    $('.select').on('click','.placeholder',function(){
      var parent = $(this).closest('.select');
      if ( ! parent.hasClass('is-open')){
        parent.addClass('is-open');
        $('.select.is-open').not(parent).removeClass('is-open');
      }else{
        parent.removeClass('is-open');
      }
    }).on('click','ul>li',function(){
      var parent = $(this).closest('.select');
      parent.removeClass('is-open').find('.placeholder').text( $(this).text() );
      parent.find('input[type=hidden]').attr('value', $(this).attr('data-value') );
    });
});

$('body').on('click', '.dropdown-selected .dropdown-link', function() {
    $('.attrs').html('');
    map[$($('.dropdown-item.dropdown-selected').find('*')[3]).html().trim().split(' ').join('_')].fields.forEach(function(field) {
        switch(field.type) {
            case 'range': {
                var element = $(`
                    <div class="col-md-2 col-xs-6">
                        <div class="title">${field.caption[lang]}</div>
                        <div class="content">
                            <div class="col-md-6">
                                <input id="${field.name}_gt" type="text" placeholder="${field.from[lang]}">
                            </div>
                            <div class="col-md-6">
                                <input id="${field.name}_lt" type="text" placeholder="${field.to[lang]}">
                            </div>
                        </div>
                    </div>
                `);
                break;
            }
            case 'range-list': {
                let s = (a) => {
                    let o = "";
                    a.forEach((x) => {
                        let y;
                        if (typeof(x) == 'object') {
                            y = x[1];
                            x = x[0];
                        } else {
                            y = x;
                        }
                        o += `<option value="${y}">${x}</option>`;
                    });
                    return o;
                } 
                var element = $(`
                    <div class="col-md-2 col-xs-6">
                        <div class="title">${field.caption[lang]} :</div>
                        <div class="content">
                            <div class="col-md-6">
                                <select id="${field.name}_gt">
                                    <option value="0">${field.from[lang]}</option>
                                    ${s(field.list)}
                                </select>
                            </div>
                            <div class="col-md-6">
                                <select id="${field.name}_lt">
                                    <option value="0">${field.to[lang]}</option>
                                    ${s(field.list)}
                                </select>
                            </div>
                        </div>
                    </div>
                `);
                break;
            }
            case 'list': {
                let s = (a) => {
                    let o = "";
                    a.forEach((x) => {
                        let y;
                        if (typeof(x) == 'object') {
                            y = x[1];
                            x = x[0];
                        } else {
                            y = x;
                        }
                        o += `<option value="${y}">${x}</option>`;
                    });
                    return o;
                } 
                var element = $(`
                    <div class="col-md-2 col-xs-6">
                        <div class="title">${field.caption[lang]} :</div>
                        <div class="content">
                            <div class="col-md-12">
                                <select id="${field.name}">
                                    <option value="0">${field.caption[lang]}</option>
                                    ${s(field.list)}
                                </select>
                            </div>
                        </div>
                    </div>
                `);
                break;
            }
            case 'option': {
                let s = (a) => {
                    let o = "";
                    a.forEach((x) => {
                        let y;
                        if (typeof(x) == 'object') {
                            y = x[1];
                            x = x[0];
                        } else {
                            y = x;
                        }
                        o += `
                            <label class="form-radiolabel col-md-12">
                                <input type="radio" class="form-radio" required="" name="${field.name}" value="${x[2]}">
                                <span class="form-radio-styler" aria-hidden="true"></span>${x[lang]}
                            </label>
                        `;
                    });
                    return o;
                } 
                var element = $(`
                    <div class="col-md-2 col-xs-6">
                        <div class="title">${field.caption[lang]} :</div>
                        <div class="content">
                            <div class="col-md-12">
                                ${s(field.options)}
                            </div>
                        </div>
                    </div>
                `);
                break;
            }
            case 'int': {
                var element = $(`
                    <div class="col-md-2 col-xs-6">
                        <div class="title">${field.caption[lang]} :</div>
                        <div class="content">
                            <div class="col-md-12">
                                <input id="${field.name}" type="text" placeholder="...">
                            </div>
                        </div>
                    </div>
                `);
                break;
            }
        }
        $('.attrs').append(element);
    });
    $('.attrs').fadeIn(100);
});

var id;
// $.ajax({
//     url: `/ad/create`,
//     method: 'GET',
//     async: false,
//     success: function(_resp) {
//         id = _resp.id;
//     }
// });

$(".closex").click(function() {
    $('.filter').fadeOut(300);
});
$(".closea").click(function() {
    $('html').css('overflow-y', 'scroll');
    $('.advl').fadeOut(300);
});
$('.filter-t').click(function() {
    $('.filter').fadeIn(300);
});
$('.adv .view').click(function(e) {
    e.preventDefault();
    $('.advl').fadeIn(300);
});
$(function() {
    $('.cat select,.cat ul').dropdown({
        toggleText: "همه ی آگهی ها",
        nested: true
    });
});


$(document).ready(function() {
  $(".toggle-accordion").on("click", function() {
    var accordionId = $(this).attr("accordion-id"),
      numPanelOpen = $(accordionId + ' .collapse.in').length;
    $(this).toggleClass("active");

    if (numPanelOpen == 0) {
      openAllPanels(accordionId);
    } else {
      closeAllPanels(accordionId);
    }
  })
  openAllPanels = function(aId) {
    console.log("setAllPanelOpen");
    $(aId + ' .panel-collapse:not(".in")').collapse('show');
  }
  closeAllPanels = function(aId) {
    console.log("setAllPanelclose");
    $(aId + ' .panel-collapse.in').collapse('hide');
  }  
});

// $('.register').click(function() {
//     var data = {}; 
//     $(this).parent().find('input, textarea').each(function() {
//         switch ($(this).attr('type')) {
//             case '':
//                 data[$(this).attr('id')] = $(this).val();
//                 break;
//             case undefined:
//                 data[$(this).attr('id')] = $(this).val();
//                 break;
//             case 'checkbox':
//                 data[$(this).attr('id')] = $(this).parent().find('#' + $(this).attr('id') + ':checked').length;
//                 break;
//             case 'text':
//                 data[$(this).attr('id')] = $(this).val();
//                 break;
//             case 'hidden':
//                 data[$(this).attr('id')] = $(this).val();
//                 break;
//             case 'radio':
//                 console.log($(this).attr('name'), $(this).parent().find("input[name=" + $(this).attr('name') + "]:checked").val());
//                 if (data[$(this).attr('name')] == null || data[$(this).attr('name')] == undefined) {
//                     data[$(this).attr('name')] = $(this).parent().find("input[name=" + $(this).attr('name') + "]:checked").val();
//                 }
//                 break;
//         }
//     });
//     $.ajax({
//         url: `/ad/set/info`,
//         method: 'POST',
//         headers: {"Content-Type": "application/json"},
//         async: false,
//         data: JSON.stringify({
//             id: id, 
//             tags: [data.city, data.na, data.cat],
//             info: JSON.stringify(data)
//         }),
//         success: function(_resp) {
//             if (_resp == 'ok') {
//                 $.ajax({
//                     url: `/ad/publish`,
//                     method: 'GET',
//                     async: false,
//                     data: {
//                         id: id
//                     },
//                     success: function(_resp) {
//                         if (_resp = "ok") {
//                         	alert("آگهی شما با موفقیت ثبت شد !");
//                         	window.location = '/';
//                         }
//                     }
//                 });
//             }
//         }
//     });
// });

$('.upi').on('click', 'span', function() {
    self = this;
    let idm = $(this).find('img').attr('src').split('/')[3].split('_')[1];
    $.ajax({
        url: `/ad/delete/image`,
        method: 'GET',
        headers: {"Content-Type": "application/json"},
        async: false,
        data: {
            id: id, 
            image: idm
        },
        success: function(_resp) {
            $(self).remove();
        }
    });
    $(this).remove();
});

$('.select').on('click','.placeholder',function(){
  var parent = $(this).closest('.select');
  if ( ! parent.hasClass('is-open')){
    parent.addClass('is-open');
    $('.select.is-open').not(parent).removeClass('is-open');
  }else{
    parent.removeClass('is-open');
  }
}).on('click','ul>li',function(){
  var parent = $(this).closest('.select');
  parent.removeClass('is-open').find('.placeholder').text( $(this).text() );
  parent.find('input[type=hidden]').attr('value', $(this).attr('data-value') );
});

$(function() { 
    $('a[href="#toggle-search"], .navbar-bootsnipp .bootsnipp-search .input-group-btn > .btn[type="reset"]').on('click', function(event) {
		event.preventDefault();
		$('.navbar-bootsnipp .bootsnipp-search .input-group > input').val('');
		$('.navbar-bootsnipp .bootsnipp-search').toggleClass('open');
		$('a[href="#toggle-search"]').closest('li').toggleClass('active');

		if ($('.navbar-bootsnipp .bootsnipp-search').hasClass('open')) {
			/* I think .focus dosen't like css animations, set timeout to make sure input gets focus */
			setTimeout(function() { 
				$('.navbar-bootsnipp .bootsnipp-search .form-control').focus();
			}, 100);
		}			
	});
	$(document).on('keyup', function(event) {
		if (event.which == 27 && $('.navbar-bootsnipp .bootsnipp-search').hasClass('open')) {
			$('a[href="#toggle-search"]').trigger('click');
		}
	});
});

var fads = {};

$('#adv .search').click(function() {
    let name = $($('.dropdown-item.dropdown-selected').find('*')[3]).html().trim().split(' ').join('_');
    let city = $('#city').val();
    let data = {'class': name, city};
    $('.attrs').find('input, select').each(function() {
        console.log($(this).val());
        if ($(this).val() !== '' && $(this).val() !== '0') {
            data[$(this).attr('id')] = $(this).val();
        }
    });
    strapi.advertise.find(data).then(results=> {
        if (results.length) {
            $('.features').fadeOut(100);
            $('.adv').html(`
                <div class="cross-line">
                    <span>نتایج جستوجوی آگهی</span>
                </div>
            `)
            results.forEach(function(ad) {
                fads[ad.id] = ad;
                data = ad;
                console.log(ad);
                $('.adv').append(`
                    <div class="blog-card col-md-6 col-sm-12">
                        <div class="meta">
                            <div class="photo" style="background-image: url(${(ad.images.length ? ad.images[0].url : '/uploads/def.jpg')})"></div>
                        </div>
                        <div class="description">
                            <h1>${data.title}</h1>
                            <h2>یک ربع پیش</h2>
                            <p>${data.description}</p>
                            <p class="read-more">
                                <a data-id='${ad.id}'class="view" href="#">مشاهده</a>
                            </p>
                        </div>
                    </div>
                `)
            });
            $([document.documentElement, document.body]).animate({
                scrollTop: $(".cross-line").offset().top - 100
            }, 600);
        } else {
            alert('نتیجه ای یافت نشد !');
        }
    });
 //    fads = {};
 //    $('.adv').html('');
	// var t = [];
	// t.push($("#adv #city").val());
	// if ($('.dropdown.dropdown-below > a .dropdown-text').length && $('.dropdown.dropdown-below > a .dropdown-text').html().trim().replace('\n', '') != 'همه ی آگهی ها') {
	// 	t.push($('.dropdown.dropdown-below > a .dropdown-text').html().trim().replace('\n', ''));
	// }
 //    $.ajax({
 //        url: `/ad/find`,
 //        method: 'GET',
 //        headers: {"Content-Type": "application/json"},
 //        async: false,
 //        data: {
 //            offset: 0,
 //            number: 10,
 //            tags: t.toString()
 //        },
 //        success: function(_resp) {
	// 	    var rs = _resp.filter((ad, i) => {
	// 	    	data = JSON.parse(ad.info);
	// 	    	if (parseInt(data.size) < ($('#sizef').val() == '' ? 0 : $('#sizef').val()) || parseInt(data.size) > ($('#sizet').val() == '' ? Infinity : $('#sizet').val())) return false;
	// 	    	if (parseInt(data.cy) < parseInt($('#yearf').val()) || parseInt(data.cy) > (parseInt($('#yeart').val()) == 0 ? Infinity : parseInt($('#yeart').val()))) return false;
	// 	    	if (parseInt(data.price) < ($('#pricef').val() == '' ? 0 : $('#pricef').val()) || parseInt(data.price) > ($('#pricet').val() == '' ? Infinity : $('#pricet').val())) return false;
	// 	    	if (($('#roomn').val() == '' ? false : (parseInt(data.rn) != $('#roomn').val()))) return false;
	// 	        return true;
	// 	    });
 //            if (rs.length) {
 //                $('.features').fadeOut(100);
 //                $('.adv').html(`
 //                    <div class="cross-line">
 //                        <span>نتایج جستوجوی آگهی</span>
 //                    </div>
 //                `)
 //                rs.forEach(function(ad) {
 //                    fads[ad.id] = ad;
 //                    data = JSON.parse(ad.info);
 //                    $('.adv').append(`
 //                        <div class="blog-card col-md-6 col-sm-12">
 //                            <div class="meta">
 //                                <div class="photo" style="background-image: url(/ad/image/${ad.images[0]})"></div>
 //                            </div>
 //                            <div class="description">
 //                                <h1>${data.title}</h1>
 //                                <h2>یک ربع پیش</h2>
 //                                <p>${data.desc}</p>
 //                                <p class="read-more">
 //                                    <a data-id='${ad.id}'class="view" href="#">مشاهده</a>
 //                                </p>
 //                            </div>
 //                        </div>
 //                    `)
 //                });
 //            } else {
 //                alert('آگهی پیدا نشد !');
 //            }
 //        }
 //    });
});

$('#addv').click(function(e) {
    e.preventDefault();
    $('.addv').fadeIn(300);
    $('html').css('overflow-y', 'hidden');
});

$('.closev').click(function(e) {
    e.preventDefault();
    $('.addv').fadeOut(300);
    $('html').css('overflow-y', 'scroll');
});

$('body').on('click', '.view', function(e) {
    e.preventDefault();
    $('html').css('overflow-y', 'hidden');
    let ad = fads[$(this).attr('data-id')];
    let data = ad
    $('.advl .containerx').html('');
    $('.advl .fields').html('');
    ad.images.forEach(function(a, i) {
        $('.advl .containerx').append(`
            <input id="item${i}" type="checkbox"/>
            <label class="item${i}" for="item${i}" style="background-image:url(${a.url});"></label>
        `);
    });
    $('.advl .title').html(data.title);
    $('.advl .desc').html(data.description);
    for (let t in map.dic) {
        // console.log(t, ' : ', data[t]);
        if (data[t] != undefined) {
            console.log(t, data[t]);
            $('.advl .fields').append(`
                <div class="data">
                    <div class="field">${map.dic[t][lang]}</div>
                    <div class="value">${data[t]}</div>
                </div>
            `)
        }
    }
    $('.advl').fadeIn(300);
});

$('.message a').click(function(){
   $('form').animate({height: "toggle", opacity: "toggle"}, "slow");
});

$('.soon').click(function(e) {
    alert('به زودی ...');
});