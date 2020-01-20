// var lang = 1; // 0 => fa, 1 => tr, 2 => en

Number.prototype.format = function(n, x) {
    var re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\.' : '$') + ')';
    return this.toFixed(Math.max(0, ~~n)).replace(new RegExp(re, 'g'), '$&,');
};

var locations = ['/', '/tr', '/en'];

var cd = {"Diğer Hizmetleri": "سایر خدمات", "Satılık Konut":"فروشی مسکونی","Kiralık Konut":"اجاره مسکونی","Satılık İşyeri":"فروشی تجاری","Kiralık İşyeri":"اجاره تجاری","Otomobil":"خودرو","Otomobil Ekipmanları":"لوازم یدكی خودرو","Motosiklet ve Ekipmanları":"موتور سیکلت و لوازم یدکی","Bilgisayar ve Notebook":"لپتاپ و كامپیوتر","Fotoğraf & Kamera":"دوربین فیلم برداری و عكاسی و ملزومات","Televizyon ve Ses Sistemleri":"صوتی و تصویری","Oyun & Konsol":"كنسول بازی و ملزومات","Cep Telefonu & Tablet":"موبایل و تبلت و ملزومات","Diğer Her Şey":"سایر وسایل","Mobilya ,Ev Dekorasyon":"مبلمان ، وسایل و تزئینات خانه","Mutfak Gereçleri":"لوازم آشپزخونه","Dekoratif Ürünler":"دكوری و روشنایی","Halı":"فرش و گلیم و قالیچه","Bahçe":"باغچه و حیاط","Aşci & Fırın Ustası":"آشپز و شیرینی پز","Temizlik":"نظافت","İnşaat ve Yapı":"عمران ، ساختمانی و معماری","Servis Elemanı":"خدمات، رستوران و فروشگاه","Hukuki , Finans ve Bankacılık":"حسابداری ، مالی ، حقوقی","Eğitim":"آموزش","Medya ,Dijital Marketing , Grafist":"رسانه و ماركتینگ و گرافیست","Pazarlama ve Ürün Yönetimi":"بازاریابی و فروش","Hastane İle İlgili":"درمانی ، زیبایی و بهداشتی","Bilgisayar ve İT":"رایانه و IT","Taşıma":"حمل و نقل","Mühendislik":"صنعت و مهندسی","Göç":"مهاجرتی","Döviz":"صرافی","Kuaför":"آرایشگری","Web Sitesi Tasarımı":"طراحی سایت و شبكه","Tercüman":"ترجمه","Tamirat":"تعمیرات","Kiralık Araç":"اجاره خودرو"}
var ce = {"Residential for sale":"فروشی مسکونی","Residential rental":"اجاره مسکونی","Commercial for sale":"فروشی تجاری","Commercial rental":"اجاره تجاری","Car":"خودرو","Spare parts for cars":"لوازم یدكی خودرو","Motorcycle and parts":"موتور سیکلت و لوازم یدکی","Laptop and PC":"لپتاپ و كامپیوتر","Camera and Accessories":"دوربین فیلم برداری و عكاسی و ملزومات","Audio and Visual":"صوتی و تصویری","Game consoles":"كنسول بازی و ملزومات","Mobile-Tablet and Accessories":"موبایل و تبلت و ملزومات","Other electronic devices":"سایر لوازم الكترونیكی","Home furniture, fixtures and decorations":"مبلمان ، وسایل و تزئینات خانه","Kitchen Accessories":"لوازم آشپزخونه","Decoration and lighting":"دكوری و روشنایی","Carpets and rugs":"فرش و گلیم و قالیچه","Garden and yard":"باغچه و حیاط","Other Items":"سایر وسایل","Chef and confectioner":"آشپز و شیرینی پز","Cleaning":"نظافت","Civil, building and architecture":"عمران ، ساختمانی و معماری","Services, restaurants and shops":"خدمات، رستوران و فروشگاه","Accounting, Finance, Legal":"حسابداری ، مالی ، حقوقی","Education":"آموزش","Media & Marketing & Graphic Designer":"رسانه و ماركتینگ و گرافیست","Marketing and Sales":"بازاریابی و فروش","Therapeutic, Beauty and Health":"درمانی ، زیبایی و بهداشتی","IT and Computers":"رایانه و IT","Transportation":"حمل و نقل","Industry and Engineering":"صنعت و مهندسی","Immigration":"مهاجرتی","Currency Exchange":"صرافی","Makeup":"آرایشگری","Web site design & Networks":"طراحی سایت و شبكه","Translation":"ترجمه","Repairs":"تعمیرات","Car rental":"اجاره خودرو","Other services":"سایر خدمات"}
var dc = {"سایر خدمات":"Diğer Hizmetleri","فروشی مسکونی":"Satılık Konut","اجاره مسکونی":"Kiralık Konut","فروشی تجاری":"Satılık İşyeri","اجاره تجاری":"Kiralık İşyeri","خودرو":"Otomobil","لوازم یدكی خودرو":"Otomobil Ekipmanları","موتور سیکلت و لوازم یدکی":"Motosiklet ve Ekipmanları","لپتاپ و كامپیوتر":"Bilgisayar ve Notebook","دوربین فیلم برداری و عكاسی و ملزومات":"Fotoğraf & Kamera","صوتی و تصویری":"Televizyon ve Ses Sistemleri","كنسول بازی و ملزومات":"Oyun & Konsol","موبایل و تبلت و ملزومات":"Cep Telefonu & Tablet","سایر وسایل":"Diğer Her Şey","مبلمان وسایل و تزئینات خانه":"Mobilya ,Ev Dekorasyon","لوازم آشپزخونه":"Mutfak Gereçleri","دكوری و روشنایی":"Dekoratif Ürünler","فرش و گلیم و قالیچه":"Halı","باغچه و حیاط":"Bahçe","آشپز و شیرینی پز":"Aşci & Fırın Ustası","نظافت":"Temizlik","عمران ساختمانی و معماری":"İnşaat ve Yapı","خدمات رستوران و فروشگاه":"Servis Elemanı","حسابداری مالی حقوقی":"Hukuki , Finans ve Bankacılık","آموزش":"Eğitim","رسانه و ماركتینگ و گرافیست":"Medya ,Dijital Marketing , Grafist","بازاریابی و فروش":"Pazarlama ve Ürün Yönetimi","درمانی زیبایی و بهداشتی":"Hastane İle İlgili","رایانه و IT":"Bilgisayar ve İT","حمل و نقل":"Taşıma","صنعت و مهندسی":"Mühendislik","مهاجرتی":"Göç","صرافی":"Döviz","آرایشگری":"Kuaför","طراحی سایت و شبكه":"Web Sitesi Tasarımı","ترجمه":"Tercüman","تعمیرات":"Tamirat","اجاره خودرو":"Kiralık Araç"}
var ec = {"فروشی مسکونی":"Residential for sale","اجاره مسکونی":"Residential rental","فروشی تجاری":"Commercial for sale","اجاره تجاری":"Commercial rental","خودرو":"Car","لوازم یدكی خودرو":"Spare parts for cars","موتور سیکلت و لوازم یدکی":"Motorcycle and parts","لپتاپ و كامپیوتر":"Laptop and PC","دوربین فیلم برداری و عكاسی و ملزومات":"Camera and Accessories","صوتی و تصویری":"Audio and Visual","كنسول بازی و ملزومات":"Game consoles","موبایل و تبلت و ملزومات":"Mobile-Tablet and Accessories","سایر لوازم الكترونیكی":"Other electronic devices","مبلمان وسایل و تزئینات خانه":"Home furniture, fixtures and decorations","لوازم آشپزخونه":"Kitchen Accessories","دكوری و روشنایی":"Decoration and lighting","فرش و گلیم و قالیچه":"Carpets and rugs","باغچه و حیاط":"Garden and yard","سایر وسایل":"Other Items","آشپز و شیرینی پز":"Chef and confectioner","نظافت":"Cleaning","عمران ساختمانی و معماری":"Civil, building and architecture","خدمات رستوران و فروشگاه":"Services, restaurants and shops","حسابداری مالی حقوقی":"Accounting, Finance, Legal","آموزش":"Education","رسانه و ماركتینگ و گرافیست":"Media & Marketing & Graphic Designer","بازاریابی و فروش":"Marketing and Sales","درمانی زیبایی و بهداشتی":"Therapeutic, Beauty and Health","رایانه و IT":"IT and Computers","حمل و نقل":"Transportation","صنعت و مهندسی":"Industry and Engineering","مهاجرتی":"Immigration","صرافی":"Currency Exchange","آرایشگری":"Makeup","طراحی سایت و شبكه":"Web site design & Networks","ترجمه":"Translation","تعمیرات":"Repairs","اجاره خودرو":"Car rental","سایر خدمات":"Other services"}
var cc = {"آنكارا":"Ankara","استانبول":"Istanbul","آنتالیا":"Antalya","ازمیر":"Izmir","تورنتو":"Toronto","دبی":"Dubai","لندن":"London","ونکوور":"Vancouver","سیدنی":"Sydney","ملبورن":"Melbourne","تفلیس":"Tbilisi"}
var mc = {
    'diploma': ['دیپلم', 'Lise mezunu'],
    'bachelor': ['کارشناسی', 'Lisans Mezunu'],
    'masters': ['کارشناسی ارشد', 'Yüksek Lisans Mezunu'],
    'PhD': ['دکترا', 'Doktora Mezunu'],
    'Dr': ['پزشکی', 'Doktor'],
    'dentist': ['دندان پزشکی', 'Diş Hekimi'],
}

function sl(s) {
    return s[lang];
}

function copyToClipboard(elem) {
      // create hidden text element, if it doesn't already exist
    var targetId = "_hiddenCopyText_";
    var isInput = elem.tagName === "INPUT" || elem.tagName === "TEXTAREA";
    var origSelectionStart, origSelectionEnd;
    if (elem.textContent == '')
        return false;
    if (isInput) {
        // can just use the original source element for the selection and copy
        target = elem;
        origSelectionStart = elem.selectionStart;
        origSelectionEnd = elem.selectionEnd;
    } else {
        // must use a temporary form element for the selection and copy
        target = document.getElementById(targetId);
        if (!target) {
            var target = document.createElement("textarea");
            target.style.position = "fixed";
            target.style.left = "-9999px";
            target.style.top = "0";
            target.id = targetId;
            document.body.appendChild(target);
        }
        target.textContent = elem.textContent;
    }
    // select the content
    var currentFocus = document.activeElement;
    target.focus();
    target.setSelectionRange(0, target.value.length);
    
    // copy the selection
    var succeed;
    try {
        succeed = document.execCommand("copy");
    } catch(e) {
        succeed = false;
    }
    // restore original focus
    if (currentFocus && typeof currentFocus.focus === "function") {
        currentFocus.focus();
    }
    
    if (isInput) {
        // restore prior selection
        elem.setSelectionRange(origSelectionStart, origSelectionEnd);
    } else {
        // clear temporary content
        target.textContent = "";
    }
    return succeed;
}


function timeSince(date) {
  var seconds = Math.floor((new Date() - date) / 1000);
  var interval = Math.floor(seconds / 31536000);
  if (interval > 1) {
    return interval + sl([" سال پیش", " Yıl Önce", " Years ago"]);
  }
  interval = Math.floor(seconds / 2592000);
  if (interval > 1) {
    return interval + sl([" ماه پیش", " Ay Önce", " Months ago"]);
  }
  interval = Math.floor(seconds / 86400);
  if (interval > 1) {
    return interval + sl([" روز پیش", " Gün Önce", " Days ago"]);
  }
  interval = Math.floor(seconds / 3600);
  if (interval > 1) {
    return interval + sl([" ساعت پیش", " Saat Önce", " Hours ago"]);
  }
  interval = Math.floor(seconds / 60);
  if (interval > 1) {
    return interval + sl([" دقیقه پیش", " Dakika Önce", " Minutes ago"]);
  }
  return Math.floor(seconds) + sl([" ثانیه پیش", " Saniye Önce", " Seconds ago"]);
}

var user;

$("body").on('click', '.ussp', function(e) {
    if (strapi.jwt != null) {
        e.preventDefault();
        $('.cover').fadeIn(300);
        $('html').css('overflow-y', 'hidden');
        $('.uads').html('');
        $('.umks').html('');
        strapi.user.me().then(e=> {
            user = e;
        });
        $('.useri').attr('src', (user.avatar == null) ? '/assets/images/udef.jpg': user.avatar.url);
        user.advertises.forEach(function(ad) {
            let data = ad;
            $('.uads').append(`
                <div class="col-md-4 col-sm-6 col-xs-12 fr">
                    <div class="blog-card">
                        <div class="meta">
                            <div class="photo" style="background-image: url(${(ad.images.length ? ad.images[0].url : '/assets/images/def.jpg')})"></div>
                        </div>
                        <div class="description">
                            <h1>${data.title}</h1>
                            <h2>${timeSince(new Date(data.created_at).getTime())}</h2>
                            <h2><span class='ct'>${sl(['دسته بندی ', 'Kategori ', 'Category '])}</span> : ${(lang == 0 ? data.class.split('_').join(' ') : (lang == 1 ? dc[data.class.split('_').join(' ')] : ec[data.class.split('_').join(' ')]))}</h2>
                            <p class="read-more">
                                <a data-id='${ad.id}'class="delete" href="#">${sl(['پاک کردن', 'Kaldırmak', 'Delete'])}</a>
                            </p>
                        </div>
                    </div>
                    ${(!ad.vip) ? `<div data-id="${ad.id}" class="dvip">${sl(['ویژه کردن آگهی', 'İlanı özel yap', 'Upgrate to Featured Ad'])}</div>` : ''}
                    ${(!ad.showcase) ? `<div data-id="${ad.id}" class="dvit">${sl(['نمایش در ویترین', 'Vitrinde göster', 'Add to showcase'])}</div>` : ''}
                </div>
            `);
        });
        user.marks.forEach(function(ad) {
            let data = ad;
            $('.umks').append(`
                <div class="col-md-4 col-sm-6 col-xs-12 fr">
                    <div class="blog-card">
                        <div class="meta">
                            <div class="photo" style="background-image: url(${(ad.images.length ? ad.images[0].url : '/assets/images/def.jpg')})"></div>
                        </div>
                        <div class="description">
                            <h1>${data.title}</h1>
                            <h2>${timeSince(new Date(data.created_at).getTime())}</h2>
                            <h2><span class='ct'>${sl(['دسته بندی ', 'Kategori ', 'Category '])}</span> : ${(lang == 0 ? data.class.split('_').join(' ') : (lang == 1 ? dc[data.class.split('_').join(' ')] : ec[data.class.split('_').join(' ')]))}</h2>
                            <p class="read-more">
                                <a data-id='${ad.id}'class="view" href="#">${sl(['مشاهده', 'İncele', 'View'])}</a>
                                <!--<p data-id='${ad.id}'class="vip">${sl(['ویژه', 'özel', 'Featured Ads'])}</p> -->
                            </p>
                        </div>
                    </div>
                </div>
            `);
        });
        $('#u-name').val(user.name);
        $('#u-last').val(user.family);
        $('#u-phone').val(user.phone);
        $('#u-address').val(user.address);
    }
});

$('body').on('click', '.delete', function(e) {
    e.preventDefault();
    let ad = $(this).attr('data-id');
    if (confirm(sl(['مطمئنيد که میخواهید این آگهی را حذف کنید ؟', 'Bu ilanı kaldırmak istediğinizden emin misiniz?', 'Are you sure you want to delete this ad?']))) {
        strapi.advertise.delete(ad).then(e=> {
            janelaPopUp.abre("id", 'p blue alert', sl(['انجام شد', 'Onay', 'Done']), sl(['با موفقیت حذف شد', 'İlan Kaldırıldı', 'Deleted successfully']));
            $(this).parent().parent().parent().parent().remove();
        });
    }
});

$("body").on('click', '.uss', function(e) {
    if (strapi.jwt != null) {
        e.preventDefault();
        $('.cover').fadeIn(300);
        $('html').css('overflow-y', 'hidden');
        $('.uads').html('');
        $('.umks').html('');
        strapi.user.me().then(e=> {
            user = e;
        });
        $('.useri').attr('src', (user.avatar == null) ? '/assets/images/udef.jpg': user.avatar.url);
        user.advertises.forEach(function(ad) {
            let data = ad;
            $('.uads').append(`
                <div class="col-md-4 col-sm-6 col-xs-12 fr">
                    <div class="blog-card">
                        <div class="meta">
                            <div class="photo" style="background-image: url(${(ad.images.length ? ad.images[0].url : '/assets/images/def.jpg')})"></div>
                        </div>
                        <div class="description">
                            <h1>${data.title}</h1>
                            <h2>${timeSince(new Date(data.created_at).getTime())}</h2>
                            <h2><span class='ct'>${sl(['دسته بندی ', 'Kategori ', 'Category '])}</span> : ${(lang == 0 ? data.class.split('_').join(' ') : (lang == 1 ? dc[data.class.split('_').join(' ')] : ec[data.class.split('_').join(' ')]))}</h2>
                            <p class="read-more">
                                <a data-id='${ad.id}'class="delete" href="#">${sl(['پاک کردن', 'Kaldırmak', 'Delete'])}</a>
                            </p>
                        </div>
                    </div>
                    ${(!ad.vip) ? `<div data-id="${ad.id}" class="dvip">${sl(['ویژه کردن آگهی', 'İlanı özel yap', 'Upgrate to Featured Ad'])}</div>` : ''}
                    ${(!ad.showcase) ? `<div data-id="${ad.id}" class="dvit">${sl(['نمایش در ویترین', 'Vitrinde göster', 'Add to showcase'])}</div>` : ''}
                </div>
            `);
        });
        user.marks.forEach(function(ad) {
            let data = ad;
            $('.umks').append(`
                <div class="col-md-4 col-sm-6 col-xs-12 fr">
                    <div class="blog-card">
                        <div class="meta">
                            <div class="photo" style="background-image: url(${(ad.images.length ? ad.images[0].url : '/assets/images/def.jpg')})"></div>
                        </div>
                        <div class="description">
                            <h1>${data.title}</h1>
                            <h2>${timeSince(new Date(data.created_at).getTime())}</h2>
                            <h2><span class='ct'>${sl(['دسته بندی ', 'Kategori ', 'Category '])}</span> : ${(lang == 0 ? data.class.split('_').join(' ') : (lang == 1 ? dc[data.class.split('_').join(' ')] : ec[data.class.split('_').join(' ')]))}</h2>
                            <p class="read-more">
                                <a data-id='${ad.id}'class="view" href="#">${sl(['مشاهده', 'İncele', 'View'])}</a>
                                <!--<p data-id='${ad.id}'class="vip">${sl(['ویژه', 'özel', 'Featured Ads'])}</p> -->
                            </p>
                        </div>
                    </div>
                </div>
            `);
        });
        $('#u-name').val(user.name);
        $('#u-last').val(user.family);
        $('#u-phone').val(user.phone);
        $('#u-address').val(user.address);
    }
});

setvit();

function setvit(city = 'آنكارا') {
    strapi.advertise.find({
        showcase: true,
        city
    }).then(function(r) {
        let v = "";
        if (r.length == 0) {
            $('.asl').hide(0);
        } else {
            $('.dcar .carousel-inner').html('');
            $('.asl').show(0);
        }
        r.forEach(function(a, i) {
            console.log(i);
            if ((i+1) % 4 == 1) {
                v += `
                    <div class="item ${(i == 0 ? 'active' : '')}">
                        <div class="">
                `;
            }
            v += `
                <div class="col-sm-3">
                    <div class="col-item">
                        <div class="photo">
                            <img src="${(a.images.length ? a.images[0].url : '/assets/images/def.jpg')}" class="img-responsive" />
                        </div>
                        <div class="info">
                            <div class="row">
                                <div class="price col-md-12">
                                    <h5>${a.title}</h5>
                                </div>
                            </div>
                            <div class="separator clear-left">
                                <p class="btn-add view" data-id="${a.id}"> 
                                    <i class="fa fa-eye"></i><a href="#" class="hidden-sm">${sl(['مشاهده', 'İncele', 'View'])}</a></p>
                            </div>
                            <div class="clearfix">
                            </div>
                        </div>
                    </div>
                </div>
            `
            if ((i+1) % 4 == 0 || (i+1) == r.length) {
                v+= `
                        </div>
                    </div>
                `
            }
        });
        $('.dcar .carousel-inner').html(v);
    });

    $('.mcar .carousel-inner').html('');
    strapi.advertise.find({
        showcase: true,
        city
    }).then(function(r) {
        let v = "";
        r.forEach(function(a, i) {
            $('.mcar .carousel-inner').append(`
                <div class="item ${(i == 0 ? 'active' : '')}">
                    <div class="row">
                        <div class="col-sm-10" style='padding: 0 !important'>                                
                            <div class="col-item">
                                <div class="photo">
                                    <img src="${(a.images.length ? a.images[0].url : '/assets/images/def.jpg')}" class="img-responsive mb"/>
                                </div>
                                <div class="info">
                                    <div class="row">
                                        <div class="price col-md-12">
                                            <h5>${a.title}</h5>
                                        </div>
                                    </div>
                                    <div class="separator clear-left">
                                        <p class="btn-add view" data-id="${a.id}">
                                            <i class="fa fa-eye"></i><a href="#" class="hidden-sm">${sl(['مشاهده', 'İncele', 'View'])}</a></p>
                                    </div>
                                    <div class="clearfix">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `);
        });
    });
}

$('.ms-city').on('click', 'ul>li', function() {
    var parent = $(this).closest('.select');
    parent.removeClass('is-open').find('.placeholder').text($(this).text());
    parent.find('input[type=hidden]').attr('value', $(this).attr('data-value'));
    setvit($(this).attr('data-value'));
});

$('.registeru').click(function() {
    data = {
        "name": $('#u-name').val(),
        "family": $('#u-last').val(),
        "phone": $('#u-phone').val(),
        "address": $('#u-address').val(),
    }
    // console.log($('#uupl').get(0));
    strapi.user.avatar.upload($('#uupl').get(0))
    .then(e => strapi.user.update(data, user.id))
    .then(e => {
        janelaPopUp.abre( "id", 'p green alert',  sl(['انجام شد', 'Onay', 'Done']),  sl(['اطلاعات شما با موفقیت ذخیره شد', 'Bilgileriniz başarıyla kaydedildi', 'You data saved successfully']));
    })
    .catch(e=> { 
        janelaPopUp.abre( "id", 'p blue alert',  sl(['خطا', 'Hata', 'Error']) ,  sl(['خطا در ذخیره اطلاعات', 'Kaydedilirken bir hata oluştu', 'Something went worng in saving data']));
    });
    
});

if (strapi.jwt != null) {
    strapi.user.me().then(e=> {
        user = e;
        $('.iul').html(`<span class="uss">${e.username}</span>`);
    });
    strapi.user.me().then(e=> {
        user = e;
        $('.ussp').html(`<span style="color: #fff !important;font-size: 13px;position: absolute;left: 10px;top: ${(lang == 0 ? '13' : '8')}px;padding: 1px 20px;border-radius: 40px !important;border: 1px solid #fff;font-weight: 400;white-space: nowrap;/* max-width: 100px; *//* overflow: hidden; */height: 26px;line-height: 26px;">${e.username}</span>`);
    });
}

var
    persianNumbers = [/۰/g, /۱/g, /۲/g, /۳/g, /۴/g, /۵/g, /۶/g, /۷/g, /۸/g, /۹/g],
    arabicNumbers = [/٠/g, /١/g, /٢/g, /٣/g, /٤/g, /٥/g, /٦/g, /٧/g, /٨/g, /٩/g];
String.prototype.fix = function() {
    let str = this;
    for (var i = 0; i < 10; i++) {
        str = str.replace(persianNumbers[i], i).replace(arabicNumbers[i], i);
    }
    return str;
};

$('body').on('keydown', 'input[type=text], input[type=textarea]', function() {
    $(this).val(($(this).val().fix()));
});
$('body').on('keyup', 'input[type=text], input[type=textarea]', function() {
    $(this).val(($(this).val().fix()));
});

$('.closep').click(function() {
    $('.cover').fadeOut(300);
    $('html').css('overflow-y', 'scroll');
});

$('.uss').click(function() {
    $('.cover').fadeIn(300);
});

var ai = [], an = 0;

$(function() {
    // Multiple images preview in browser
    var imagesPreview = function(input, placeToInsertImagePreview, mul = true, ip = false) {

        if (input.files) {
            var filesAmount = input.files.length;
            if (!mul)
                placeToInsertImagePreview.html('<div class="clear"></div>');

            for (i = 0; i < filesAmount; i++) {
                var reader = new FileReader();

                reader.onload = function(event) {
                    $(`
                    <span>
                        <img src="${event.target.result}">
                        <i data-index="${(ip ? -1 : an)}" class="aim material-icons">close</i>
                    </span>
                    `).prependTo(placeToInsertImagePreview);
                    an++;
                }
                reader.readAsDataURL(input.files[i]);
            }
            placeToInsertImagePreview.append('<div class="clear"></div>');
        }

    };
    $('body').on('click', '.aim', function() {
        let index = parseInt($(this).attr('data-index'));
        let self = this;
        if (index == -1) {
            strapi.user.avatar.delete().then(function() {
                $(self).prev().attr('src', '/assets/images/udef.jpg');
            });
            return false;
        }
        ai = ai.filter(e => ai.indexOf(e) != index);
        $(this).parent().remove();
    });
    $('body').on('change', '#file', function() {
        for (let i = 0;i < this.files.length;i++) {
            ai.push(this.files[i]);
        }
        imagesPreview(this, $(this).parent().parent().find('.upi'));
    });
    $('body').on('change', '#uupl', function() {
        imagesPreview(this, $('.uupi'), false, true);
    });
});

var map = {
    dic: {
        'class': ['دسته بندی', 'Kategori', 'Category'],
        'city': ['شهر', 'İl', 'City'],
        'price': ['قیمت', 'Fiyat', 'Price'],
        'areaOfBuilding': ['متراژ', '㎡', 'Area of building'],
        'ageOfBuilding': ['سن ساختمان', 'Bina Yaşı', 'Age of building'],
        'numberOfRooms': ['تعداد اتاق', 'Oda Sayısı', 'Number of rooms'],
        'deposits': ['ودیعه', 'Depozito', 'Deposit'],
        'rent': ['اجاره', 'Kira', 'Rent'],
        'manufacturer': ['سازنده', 'Marka', 'Brand'],
        'kilometers': ['کارکرد', 'KM', 'KM'],
        'workExperience': ['سابقه کاری', 'İş Tecrübesi', 'Work background'],
        'education': ['مدرک', 'Eğitim Durumu', 'Degree'],
    },
    'فروشی_مسکونی': {
        fields: [{
                name: 'areaOfBuilding',
                type: 'range',
                input: 'int',
                from: ['از', 'En Düşük', 'From'],
                to: ['تا', 'En Yüksek', 'To'],
                caption: ['متراژ - متر مربع', '㎡', '㎡'],
            },
            {
                name: 'ageOfBuilding',
                type: 'range-list',
                input: 'int',
                list: (function() {
                    let out = [];
                    for (let i = 1; i < 50; i++) {
                        out.push(i);
                    }
                    out.push(['&#8734;', 1000]);
                    return out;
                })(),
                from: ['از', 'En Düşük', 'From'],
                to: ['تا', 'En Yüksek', 'To'],
                caption: ['سن ساختمان', 'Bina Yaşı', 'Age of building'],
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
                type: 'list',
                input: 'int',
                list: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
                caption: ['تعداد اتاق', 'Oda Sayısı', 'Number of rooms'],
            },
            {
                name: 'price',
                type: 'range',
                input: 'int',
                from: ['از', 'En Düşük', 'From'],
                to: ['تا', 'En Yüksek', 'To'],
                caption: ['قیمت (لیر)', 'Fiyat', 'Rent'],
            },
        ],
    },
    'اجاره_مسکونی': {
        fields: [{
                name: 'areaOfBuilding',
                type: 'range',
                input: 'int',
                from: ['از', 'En Düşük', 'From'],
                to: ['تا', 'En Yüksek', 'To'],
                caption: ['متراژ - متر مربع', '㎡', '㎡'],
            },
            {
                name: 'ageOfBuilding',
                type: 'range-list',
                input: 'int',
                list: (function() {
                    let out = [];
                    for (let i = 1; i < 50; i++) {
                        out.push(i);
                    }
                    out.push(['&#8734;', 1000]);
                    return out;
                })(),
                from: ['از', 'En Düşük', 'From'],
                to: ['تا', 'En Yüksek', 'To'],
                caption: ['سن ساختمان', 'Bina Yaşı', 'Age of building'],
            },
            {
                name: 'numberOfRooms',
                type: 'list',
                input: 'int',
                list: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
                caption: ['تعداد اتاق', 'Oda Sayısı', 'Number of rooms'],
            },
            {
                name: 'deposits',
                type: 'range',
                input: 'int',
                from: ['از', 'En Düşük', 'From'],
                to: ['تا', 'En Yüksek', 'To'],
                caption: ['ودیعه (لیر)', 'Depozito', 'Deposits'],
            },
            {
                name: 'rent',
                type: 'range',
                input: 'int',
                from: ['از', 'En Düşük', 'From'],
                to: ['تا', 'En Yüksek', 'To'],
                caption: ['اجاره (لیر)', 'Kira', 'Rent'],
            },
        ],
    },
    'فروشی_تجاری': {
        fields: [{
                name: 'areaOfBuilding',
                type: 'range',
                input: 'int',
                from: ['از', 'En Düşük', 'From'],
                to: ['تا', 'En Yüksek', 'To'],
                caption: ['متراژ - متر مربع', '㎡', '㎡'],
            },
            {
                name: 'ageOfBuilding',
                type: 'range-list',
                input: 'int',
                list: (function() {
                    let out = [];
                    for (let i = 1; i < 50; i++) {
                        out.push(i);
                    }
                    out.push(['&#8734;', 1000]);
                    return out;
                })(),
                from: ['از', 'En Düşük', 'From'],
                to: ['تا', 'En Yüksek', 'To'],
                caption: ['سن ساختمان', 'Bina Yaşı', 'Age of building'],
            },
            {
                name: 'price',
                type: 'range',
                input: 'int',
                from: ['از', 'En Düşük', 'From'],
                to: ['تا', 'En Yüksek', 'To'],
                caption: ['قیمت (لیر)', 'Fiyat', 'Rent'],
            },
        ],
    },
    'اجاره_تجاری': {
        fields: [{
                name: 'areaOfBuilding',
                type: 'range',
                input: 'int',
                from: ['از', 'En Düşük', 'From'],
                to: ['تا', 'En Yüksek', 'To'],
                caption: ['متراژ - متر مربع', '㎡', '㎡'],
            },
            {
                name: 'ageOfBuilding',
                type: 'range-list',
                input: 'int',
                list: (function() {
                    let out = [];
                    for (let i = 1; i < 50; i++) {
                        out.push(i);
                    }
                    out.push(['&#8734;', 1000]);
                    return out;
                })(),
                from: ['از', 'En Düşük', 'From'],
                to: ['تا', 'En Yüksek', 'To'],
                caption: ['سن ساختمان', 'Bina Yaşı', 'Age of building'],
            },
            {
                name: 'numberOfRooms',
                type: 'list',
                input: 'int',
                list: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
                caption: ['تعداد اتاق', 'Oda Sayısı', 'Number of rooms'],
            },
            {
                name: 'deposits',
                type: 'range',
                input: 'int',
                from: ['از', 'En Düşük', 'From'],
                to: ['تا', 'En Yüksek', 'To'],
                caption: ['ودیعه (لیر)', 'Depozito', 'Deposits'],
            },
            {
                name: 'rent',
                type: 'range',
                input: 'int',
                from: ['از', 'En Düşük', 'From'],
                to: ['تا', 'En Yüksek', 'To'],
                caption: ['اجاره (لیر)', 'Kira', 'Rent'],
            },
        ],
    },
    'خودرو': {
        fields: [{
                name: 'manufacturer',
                type: 'list',
                input: 'list',
                list: ["Alfa Romeo", "Anadol", "Aston martin", "Audi", "Bentley", "BMW", "Bugatti", "Buick", "Cadillac", "Caterham", "Chery", "Chevrolet", "Chrysler", "Citroen", "Dacia", "Daewoo", "Daihatsu", "Dodge", "Ds Automobiles", "Ferrari", "Fiat", "Ford", "Geely", "Honda", "Hyundai", "Ikco", "Infinity", "Isuzu", "Jaguar", "Kia", "Lada", "Lamborghini", "Lancia", "Lexus", "Lincoln", "Lotus", "Maserati", "Mazda", "Mclaren", "Mercedes - benz", "Mercury", "MG", "Mini", "Mitsubishi", "Morgan", "Moskwitsch", "Nissan", "Oldsmobile", "Opel", "Peugeot", "Plymouth", "Pontiac", "Porsche", "Proton", "Renault", "Rolls-Royce", "Rover", "Saab", "Seat", "Skoda", "Smart", "Subaru", "Suzuki", "Tata", "Tesla", "Toyota", "Volkswagen", "Volvo"],
                caption: ['برند', 'Marka', 'brand'],
            },
            {
                name: 'kilometers',
                type: 'range',
                input: 'int',
                from: ['از', 'En Düşük', 'From'],
                to: ['تا', 'En Yüksek', 'To'],
                caption: ['کارکرد (کیلومتر)', 'KM', 'KM'],
            },
            {
                name: 'price',
                type: 'range',
                input: 'int',
                from: ['از', 'En Düşük', 'From'],
                to: ['تا', 'En Yüksek', 'To'],
                caption: ['قیمت (لیر)', 'Fiyat', 'Price'],
            },
        ],
    },
    'لوازم_یدكی_خودرو': {
        fields: [{
            name: 'price',
            type: 'range',
            input: 'int',
            from: ['از', 'En Düşük', 'From'],
            to: ['تا', 'En Yüksek', 'To'],
            caption: ['قیمت (لیر)', 'Fiyat', 'Price'],
        }, ],
    },
    'موتور_سیکلت_و_لوازم_یدکی': {
        fields: [{
            name: 'price',
            type: 'range',
            input: 'int',
            from: ['از', 'En Düşük', 'From'],
            to: ['تا', 'En Yüksek', 'To'],
            caption: ['قیمت (لیر)', 'Fiyat', 'Price'],
        }, ],
    },
    'لپتاپ_و_كامپیوتر': {
        fields: [
            {
                name: 'manufacturer',
                type: 'list',
                input: 'list',
                list: ["Acer", "Advent", "Aidata", "Akai", "Alienware", "Apple Macbook", "Arçelik", "Asus", "Averatech", "Beko", "BenQ", "Brother", "Byron", "Casper", "Cbox", "Conpaq", "Crea", "Datron", "Dell", "Dente", "ECS", "Escort", "Exper", "Fujitsu", "Fujitsu Siemens", "Gateway", "Gericom", "Getac", "Gigabyte", "Google", "Grundig", "Haier", "Hitachi", "Hometech", "HP", "Huawei", "IBM", "Keysmart", "Lenovo", "LG", "Medion", "Microsoft", "Monster", "Msi", "NEC", "Packard Bell", "Panasonic", "Philips", "Probook", "Queen", "Razer", "Regal", "Samsung", "Smartbook", "Sony", "Sunny", "Toshiba", "Vestel", "Woon", "Xiaomi", "Yepo", "غيره ..."],
                caption: ['برند', 'Marka', 'Brand'],
            },
            {
                name: 'price',
                type: 'range',
                input: 'int',
                from: ['از', 'En Düşük', 'From'],
                to: ['تا', 'En Yüksek', 'To'],
                caption: ['قیمت (لیر)', 'Fiyat', 'Price'],
            },
        ],
    },
    'دوربین_فیلم_برداری_و_عكاسی_و_ملزومات': {
        fields: [{
            name: 'price',
            type: 'range',
            input: 'int',
            from: ['از', 'En Düşük', 'From'],
            to: ['تا', 'En Yüksek', 'To'],
            caption: ['قیمت (لیر)', 'Fiyat', 'Price'],
        }, ],
    },
    'صوتی_و_تصویری': {
        fields: [{
            name: 'price',
            type: 'range',
            input: 'int',
            from: ['از', 'En Düşük', 'From'],
            to: ['تا', 'En Yüksek', 'To'],
            caption: ['قیمت (لیر)', 'Fiyat', 'Price'],
        }, ],
    },
    'موبایل_و_تبلت_و_ملزومات': {
        fields: [{
            name: 'price',
            type: 'range',
            input: 'int',
            from: ['از', 'En Düşük', 'From'],
            to: ['تا', 'En Yüksek', 'To'],
            caption: ['قیمت (لیر)', 'Fiyat', 'Price'],
        }, ],
    },
    'كنسول_بازی_و_ملزومات': {
        fields: [{
            name: 'price',
            type: 'range',
            input: 'int',
            from: ['از', 'En Düşük', 'From'],
            to: ['تا', 'En Yüksek', 'To'],
            caption: ['قیمت (لیر)', 'Fiyat', 'Price'],
        }, ],
    },
    'سایر_لوازم_الكترونیكی': {
        fields: [{
            name: 'price',
            type: 'range',
            input: 'int',
            from: ['از', 'En Düşük', 'From'],
            to: ['تا', 'En Yüksek', 'To'],
            caption: ['قیمت (لیر)', 'Fiyat', 'Price'],
        }, ],
    },
    'آشپز_و_شیرینی_پز': {
        fields: [
        {
            name: 'workExperience',
            type: 'list',
            input: 'int',
            list: [0, 1, 2, 3, ['&#8734;', 1000]],
            caption: ['سابقه کاری', 'İş Tecrübesi', 'Academic background'],
        }, 
        {
            name: 'education',
            type: 'list',
            input: 'list',
            list: [['دیپلم', 'diploma'], ['کارشناسی', 'bachelor'], ['کارشناسی ارشد', 'masters'], ['دکترا', 'PhD'], ['پزشکی', 'Dr'], ['دندان پزشکی', 'dentist']],
            caption: ['مدرک', 'Eğitim Durumu', 'Degree'],
        }, 
        ],
    },
    'نظافت': {
        fields: [
        {
            name: 'workExperience',
            type: 'list',
            input: 'int',
            list: [0, 1, 2, 3, ['&#8734;', 1000]],
            caption: ['سابقه کاری', 'İş Tecrübesi', 'Academic background'],
        }, 
        {
            name: 'education',
            type: 'list',
            input: 'list',
            list: [['دیپلم', 'diploma'], ['کارشناسی', 'bachelor'], ['کارشناسی ارشد', 'masters'], ['دکترا', 'PhD'], ['پزشکی', 'Dr'], ['دندان پزشکی', 'dentist']],
            caption: ['مدرک', 'Eğitim Durumu', 'Degree'],
        }, 
        ],
    },
    'عمران_ساختمانی_و_معماری': {
        fields: [
        {
            name: 'workExperience',
            type: 'list',
            input: 'int',
            list: [0, 1, 2, 3, ['&#8734;', 1000]],
            caption: ['سابقه کاری', 'İş Tecrübesi', 'Academic background'],
        }, 
        {
            name: 'education',
            type: 'list',
            input: 'list',
            list: [['دیپلم', 'diploma'], ['کارشناسی', 'bachelor'], ['کارشناسی ارشد', 'masters'], ['دکترا', 'PhD'], ['پزشکی', 'Dr'], ['دندان پزشکی', 'dentist']],
            caption: ['مدرک', 'Eğitim Durumu', 'Degree'],
        }, 
        ],
    },
    'خدمات_رستوران_و_فروشگاه': {
        fields: [
        {
            name: 'workExperience',
            type: 'list',
            input: 'int',
            list: [0, 1, 2, 3, ['&#8734;', 1000]],
            caption: ['سابقه کاری', 'İş Tecrübesi', 'Academic background'],
        }, 
        {
            name: 'education',
            type: 'list',
            input: 'list',
            list: [['دیپلم', 'diploma'], ['کارشناسی', 'bachelor'], ['کارشناسی ارشد', 'masters'], ['دکترا', 'PhD'], ['پزشکی', 'Dr'], ['دندان پزشکی', 'dentist']],
            caption: ['مدرک', 'Eğitim Durumu', 'Degree'],
        }, 
        ],
    },
    'آموزش': {
        fields: [
        {
            name: 'workExperience',
            type: 'list',
            input: 'int',
            list: [0, 1, 2, 3, ['&#8734;', 1000]],
            caption: ['سابقه کاری', 'İş Tecrübesi', 'Academic background'],
        }, 
        {
            name: 'education',
            type: 'list',
            input: 'list',
            list: [['دیپلم', 'diploma'], ['کارشناسی', 'bachelor'], ['کارشناسی ارشد', 'masters'], ['دکترا', 'PhD'], ['پزشکی', 'Dr'], ['دندان پزشکی', 'dentist']],
            caption: ['مدرک', 'Eğitim Durumu', 'Degree'],
        }, 
        ],
    },
    'رسانه_و_ماركتینگ_و_گرافیست': {
        fields: [
        {
            name: 'workExperience',
            type: 'list',
            input: 'int',
            list: [0, 1, 2, 3, ['&#8734;', 1000]],
            caption: ['سابقه کاری', 'İş Tecrübesi', 'Academic background'],
        }, 
        {
            name: 'education',
            type: 'list',
            input: 'list',
            list: [['دیپلم', 'diploma'], ['کارشناسی', 'bachelor'], ['کارشناسی ارشد', 'masters'], ['دکترا', 'PhD'], ['پزشکی', 'Dr'], ['دندان پزشکی', 'dentist']],
            caption: ['مدرک', 'Eğitim Durumu', 'Degree'],
        }, 
        ],
    },
    'حسابداری_مالی_حقوقی': {
        fields: [
        {
            name: 'workExperience',
            type: 'list',
            input: 'int',
            list: [0, 1, 2, 3, ['&#8734;', 1000]],
            caption: ['سابقه کاری', 'İş Tecrübesi', 'Academic background'],
        }, 
        {
            name: 'education',
            type: 'list',
            input: 'list',
            list: [['دیپلم', 'diploma'], ['کارشناسی', 'bachelor'], ['کارشناسی ارشد', 'masters'], ['دکترا', 'PhD'], ['پزشکی', 'Dr'], ['دندان پزشکی', 'dentist']],
            caption: ['مدرک', 'Eğitim Durumu', 'Degree'],
        }, 
        ],
    },
    'رسانه_و_ماركتینگ_و_گرافیست': {
        fields: [
        {
            name: 'workExperience',
            type: 'list',
            input: 'int',
            list: [0, 1, 2, 3, ['&#8734;', 1000]],
            caption: ['سابقه کاری', 'İş Tecrübesi', 'Academic background'],
        }, 
        {
            name: 'education',
            type: 'list',
            input: 'list',
            list: [['دیپلم', 'diploma'], ['کارشناسی', 'bachelor'], ['کارشناسی ارشد', 'masters'], ['دکترا', 'PhD'], ['پزشکی', 'Dr'], ['دندان پزشکی', 'dentist']],
            caption: ['مدرک', 'Eğitim Durumu', 'Degree'],
        }, 
        ],
    },
    'بازاریابی_و_فروش': {
        fields: [
        {
            name: 'workExperience',
            type: 'list',
            input: 'int',
            list: [0, 1, 2, 3, ['&#8734;', 1000]],
            caption: ['سابقه کاری', 'İş Tecrübesi', 'Academic background'],
        }, 
        {
            name: 'education',
            type: 'list',
            input: 'list',
            list: [['دیپلم', 'diploma'], ['کارشناسی', 'bachelor'], ['کارشناسی ارشد', 'masters'], ['دکترا', 'PhD'], ['پزشکی', 'Dr'], ['دندان پزشکی', 'dentist']],
            caption: ['مدرک', 'Eğitim Durumu', 'Degree'],
        }, 
        ],
    },
    'درمانی_زیبایی_و_بهداشتی': {
        fields: [
        {
            name: 'workExperience',
            type: 'list',
            input: 'int',
            list: [0, 1, 2, 3, ['&#8734;', 1000]],
            caption: ['سابقه کاری', 'İş Tecrübesi', 'Academic background'],
        }, 
        {
            name: 'education',
            type: 'list',
            input: 'list',
            list: [['دیپلم', 'diploma'], ['کارشناسی', 'bachelor'], ['کارشناسی ارشد', 'masters'], ['دکترا', 'PhD'], ['پزشکی', 'Dr'], ['دندان پزشکی', 'dentist']],
            caption: ['مدرک', 'Eğitim Durumu', 'Degree'],
        }, 
        ],
    },
    'رایانه_و_IT': {
        fields: [
        {
            name: 'workExperience',
            type: 'list',
            input: 'int',
            list: [0, 1, 2, 3, ['&#8734;', 1000]],
            caption: ['سابقه کاری', 'İş Tecrübesi', 'Academic background'],
        }, 
        {
            name: 'education',
            type: 'list',
            input: 'list',
            list: [['دیپلم', 'diploma'], ['کارشناسی', 'bachelor'], ['کارشناسی ارشد', 'masters'], ['دکترا', 'PhD'], ['پزشکی', 'Dr'], ['دندان پزشکی', 'dentist']],
            caption: ['مدرک', 'Eğitim Durumu', 'Degree'],
        }, 
        ],
    },
    'حمل_و_نقل': {
        fields: [
        {
            name: 'workExperience',
            type: 'list',
            input: 'int',
            list: [0, 1, 2, 3, ['&#8734;', 1000]],
            caption: ['سابقه کاری', 'İş Tecrübesi', 'Academic background'],
        }, 
        {
            name: 'education',
            type: 'list',
            input: 'list',
            list: [['دیپلم', 'diploma'], ['کارشناسی', 'bachelor'], ['کارشناسی ارشد', 'masters'], ['دکترا', 'PhD'], ['پزشکی', 'Dr'], ['دندان پزشکی', 'dentist']],
            caption: ['مدرک', 'Eğitim Durumu', 'Degree'],
        }, 
        ],
    },
    'صنعت_و_مهندسی': {
        fields: [
        {
            name: 'workExperience',
            type: 'list',
            input: 'int',
            list: [0, 1, 2, 3, ['&#8734;', 1000]],
            caption: ['سابقه کاری', 'İş Tecrübesi', 'Academic background'],
        }, 
        {
            name: 'education',
            type: 'list',
            input: 'list',
            list: [['دیپلم', 'diploma'], ['کارشناسی', 'bachelor'], ['کارشناسی ارشد', 'masters'], ['دکترا', 'PhD'], ['پزشکی', 'Dr'], ['دندان پزشکی', 'dentist']],
            caption: ['مدرک', 'Eğitim Durumu', 'Degree'],
        }, 
        ],
    },
    'مهاجرتی': {
        fields: [],
    },
    'صرافی': {
        fields: [],
    },
    'آرایشگری': {
        fields: [],
    },
    'طراحی_سایت_و_شبكه': {
        fields: [],
    },
    'ترجمه': {
        fields: [],
    },
    'تعمیرات': {
        fields: [],
    },
    'سایر_خدمات': {
        fields: [],
    },
    'اجاره_خودرو': {
        fields: [],
    },
    'مبلمان_وسایل_و_تزئینات_خانه': {
        fields: [{
            name: 'price',
            type: 'range',
            input: 'int',
            from: ['از', 'En Düşük', 'From'],
            to: ['تا', 'En Yüksek', 'To'],
            caption: ['قیمت (لیر)', 'Fiyat', 'Price'],
        }, ],
    },
    'لوازم_آشپزخونه': {
        fields: [{
            name: 'price',
            type: 'range',
            input: 'int',
            from: ['از', 'En Düşük', 'From'],
            to: ['تا', 'En Yüksek', 'To'],
            caption: ['قیمت (لیر)', 'Fiyat', 'Price'],
        }, ],
    },
    'دكوری_و_روشنایی': {
        fields: [{
            name: 'price',
            type: 'range',
            input: 'int',
            from: ['از', 'En Düşük', 'From'],
            to: ['تا', 'En Yüksek', 'To'],
            caption: ['قیمت (لیر)', 'Fiyat', 'Price'],
        }, ],
    },
    'فرش_و_گلیم_و_قالیچه': {
        fields: [{
            name: 'price',
            type: 'range',
            input: 'int',
            from: ['از', 'En Düşük', 'From'],
            to: ['تا', 'En Yüksek', 'To'],
            caption: ['قیمت (لیر)', 'Fiyat', 'Price'],
        }, ],
    },
    'باغچه_و_حیاط': {
        fields: [{
            name: 'price',
            type: 'range',
            input: 'int',
            from: ['از', 'En Düşük', 'From'],
            to: ['تا', 'En Yüksek', 'To'],
            caption: ['قیمت (لیر)', 'Fiyat', 'Price'],
        }, ],
    },
    'سایر_وسایل': {
        fields: [{
            name: 'price',
            type: 'range',
            input: 'int',
            from: ['از', 'En Düşük', 'From'],
            to: ['تا', 'En Yüksek', 'To'],
            caption: ['قیمت (لیر)', 'Fiyat', 'Price'],
        }, ],
    },
}

$('body').click(function(e) {
    if ($(e.target).hasClass('placeholder')) return false;
    $('.select').removeClass('is-open');
});

$('.afilters i').click(function() {
    $('.attrs').slideToggle();
    if ($(this).html() == 'keyboard_arrow_down') {
        $(this).html('keyboard_arrow_up');
    } else {
        $(this).html('keyboard_arrow_down');
    }
});

$('body').on('click', '.register', function() {
    let data = {
        'submitted': true
    };
    let end;
    $(this).parent().find('input, textarea').each(function() {
        // console.log($(this).attr('id'), $(this).val());
        if ($(this).attr('id') == 'city' && ($(this).val() == '0' || $(this).val() == '')) {
            janelaPopUp.abre("id", 'p orange alert', sl(['خطا', 'Hata', 'Error']), sl(['شهر انتخاب شده مجاز نیست', 'Seçilen şehre izin verilmiyor', 'Selected city is not active']));
            end = true;
        }
        if ($(this).attr('id') == 'title' && $(this).val() == '') {
            janelaPopUp.abre("id", 'p orange alert', sl(['خطا', 'Hata', 'Error']), sl(['عنوان نمیتواند خالی باشد', 'Başlık boş bırakılamaz', "Title can't be empty"]));
            end = true;
        }
        if ($(this).attr('id') == 'price' && $(this).val() == '') {
            janelaPopUp.abre("id", 'p orange alert', sl(['خطا', 'Hata', 'Error']), sl(['قیمت نمیتواند خالی باشد', 'Fiyat boş bırakılamaz', "Price can't be empty"]));
            end = true;
        }
        if (['price', 'rent', 'deposits'].includes($(this).attr('id'))) {
            data[$(this).attr('id')] = $(this).val().split(',').join('').split('₺').join('');
        } else {
            data[$(this).attr('id')] = $(this).val();
        }
    });
    if (end) {
        return false;
    }
    // console.log(data);
    $(this).html(`<i class="material-icons">hourglass_empty</i>`);
    strapi.advertise.create(data).then((buff) => {
        strapi.advertise.image.upload({files: ai}, buff.id).then(res => {
            janelaPopUp.abre("id", 'p green alert', sl(['انجام شد', 'Onay', 'Done']), sl(['آگهی با موفقیت ثبت شد', 'Fotoğraf yükleme sorunu', 'Advertise added successfully']));
            $(this).html(sl([`ثبت آگهی`, 'İlan ver', 'Post Ad']));
            $('.closev').trigger('click');
            setTimeout(function() {
                window.location = locations[lang];
            }, 1800);
        }).catch(e => {
            // console.log(e);
            janelaPopUp.abre("id", 'p orange alert', sl(['خطا', 'Hata', 'Error']), sl(['مشکل در آپلود عکس ها', 'Fotoğraf yükleme sorunu', 'Something went wrong while uploading images']));
            $(this).html(sl([`ثبت آگهی`, 'İlan ver', 'Post Ad']));
            $('.closev').trigger('click');
        });
        $('.select').on('click', '.placeholder', function() {
            var parent = $(this).closest('.select');
            if (!parent.hasClass('is-open')) {
                parent.addClass('is-open');
                $('.select.is-open').not(parent).removeClass('is-open');
            } else {
                parent.removeClass('is-open');
            }
        }).on('click', 'ul>li', function() {
            var parent = $(this).closest('.select');
            parent.removeClass('is-open').find('.placeholder').text($(this).text());
            parent.find('input[type=hidden]').attr('value', $(this).attr('data-value'));
        });
    }).catch(e => {
        // console.log(e);
        janelaPopUp.abre("id", 'p orange alert', sl(['خطا', 'Hata', 'Error']), sl(['برای ثبت آگهی ابتدا باید وارد شوید', 'Bir İlan ver için önce giriş yapmalısınız', 'You need to login for adding an advertise']));
        $(this).html(sl([`ثبت آگهی`, 'İlan ver', 'Post Ad']));
        $('.closev').trigger('click');
    });
});

$('body').on('click', '.register-vip', function() {
    $('.tovit').slideUp(function() {
        $('.tovip').slideDown(300);
    });
});

$('body').on('click', '.register-vit', function() {
    $('.tovip').slideUp(function() {
        $('.tovit').slideDown(300);
    })
});

$('.panel-collapse.collapse a').click(function() {
    let name = $(this).attr('href').split('#')[1];
    // console.log(name);
    let self = this;
    $(this).parent().parent().parent().find('.panel-body').html('');
    $(this).parent().parent().parent().find('.panel-body').append(`
        <input type="hidden" id="class" value="${name}">
        <div class="field">
            <div class="title">${sl(['شهر', 'İl', 'City'])}</div>
            <div class="select col-md-5">
                <span class="placeholder">${sl(['انتخاب شهر', 'İl Seçenek', 'Select City'])}</span>
                <ul>
                    <li data-value="آنكارا">${sl(['آنكارا', 'Ankara', 'Ankara'])}</li>
                    <li data-value="استانبول">${sl(['استانبول', 'Istanbul', 'Istanbul'])}</li>
                    <li data-value="آنتالیا">${sl(['آنتالیا', 'Antalya', 'Antalya'])}</li>
                    <li data-value="ازمیر">${sl(['ازمیر', 'Izmir', 'Izmir'])}</li>
                    <li data-value="0">${sl(['تورونتو', 'Toronto', 'Toronto'])}<span class='syel'>(${sl(['به زودی', 'Yakında', 'Soon'])})</span></li>
                    <li data-value="0">${sl(['دوبی  ', 'Dubai', 'Dubai'])}<span class='syel'>(${sl(['به زودی', 'Yakında', 'Soon'])})</span></li>
                    <li data-value="0">${sl(['لندن ', 'London', 'London'])}<span class='syel'>(${sl(['به زودی', 'Yakında', 'Soon'])})</span></li>
                    <li data-value="0">${sl(['ونكوور ', 'Vancouver', 'Vancouver'])}<span class='syel'>(${sl(['به زودی', 'Yakında', 'Soon'])})</span></li>
                    <li data-value="0">${sl(['منچستر ', 'Sydney', 'Sydney'])}<span class='syel'>(${sl(['به زودی', 'Yakında', 'Soon'])})</span></li>
                    <li data-value="0">${sl(['سیدنی ', 'Sydney', 'Sydney'])}<span class='syel'>(${sl(['به زودی', 'Yakında', 'Soon'])})</span></li>
                    <li data-value="0">${sl(['ملبورن  ', 'Melbourne', 'Melbourne'])}<span class='syel'>(${sl(['به زودی', 'Yakında', 'Soon'])})</span></li>
                    <li data-value="0">${sl(['تفلیس ', 'Tbilisi', 'Tbilisi'])}<span class='syel'>(${sl(['به زودی', 'Yakında', 'Soon'])})</span></li>
                </ul>
                <input type="hidden" required id="city" />
            </div>
            <div class="clear"></div>
        </div>
        <div class="field">
            <div class="title">${sl(['عکس آگهی', 'İlanın Fotoğrafı', 'Advertise images'])}</div>
            <div class="info">${sl(['افزودنِ عکس بازدید آگهی شما را تا سه برابر افزایش می‌دهد. عکس هارا به صورت یکجا انتخاب کنید.', 'Fotoğraf Eklemek, İlanızın Görünürlüğünü Üç Katına Çıkarır.Fotoğrafları Birlikte Seçiniz.', 'Adding image triple your advertise view, pick them all once'])}</div>
            <p class="file">
                <label for="file" id="upl">${sl(['افزودن عکس', 'Fotoğraf Seçin', 'Select image'])}<i class="material-icons">add</i></label>
                <input id="file" type="file" multiple accept="image/*">
                <div class="clear"></div>
            </p>
            <div class="upi">
            </div>
        </div>
    `);
    map[name].fields.forEach(function(field) {
        switch (field.input) {
            case 'int': {
                let cc = '';
                if (['price', 'rent', 'deposits'].includes(field.name)) {
                    cc = "data-type='currency'";
                }
                console.log(field, cc);
                $(self).parent().parent().parent().find('.panel-body').append(`
                    <div class="field">
                        <div class="title">${field.caption[lang]} : </div>
                        <input type="text" ${cc} id="${field.name}" onkeypress='validaten(event)' required placeholder="...">
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
                        <div class="title">${field.caption[lang]} : </div>
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
            <div class="title">${sl(['شمارهٔ موبایل', 'telefonu numarası', 'Phone number'])}</div>
            <div class="info">${sl(['شماره موبایل معتبری وارد کنید تا کاربران بتوانند با شما ارتباط برقرار کنند.', 'Geçerli bir cep telefonu numarası girin', 'Enter a valid phone number so user can contact you'])}</div>
            <input type="text" id="phone" placeholder="${sl(['شماره موبایل معتبر', 'Geçerli cep telefonu numarası', 'Your phone number'])}">
            <div class="clear"></div>
        </div>
        <div class="field">
            <div class="title">${sl(['عنوان', 'Başlık', 'Title'])}</div>
            <div class="info">${sl(['در عنوان آگهی به موارد مهم و چشمگیر اشاره کنید.', 'İlan Başlığındaki Önemli Noktaları Vurgulayın.', 'Mention important things about your advertise in the title'])}</div>
            <input type="text" id="title" placeholder="...">
            <div class="clear"></div>
        </div>
        <div class="field">
            <div class="title">${sl(['توضیحات آگهی', 'İlanın  Açıklaması', 'Description'])}</div>
            <div class="info">${sl(['جزئیات و نکات قابل توجه آگهی خود را کامل و دقیق بنویسید تا شانس موفقیت آگهی شما بیشتر شود.', 'İlanınıza En İyi Şansı ver İçin Önemli Noktalar ve Detayları Yazınız', 'Type down details and significant features in the description so users can exactly see what you are presenting'])}</div>
            <textarea id="description"></textarea>
            <div class="clear"></div>
        </div>
        <button class="register" id="submit">${sl([`ثبت رایگان آگهی`, 'İlan ver', 'Post Free Ad'])}</button>
        <button class="register-vip" id="submit">${sl([`ثبت ویژه آگهی`, 'Özel İlan ver', 'Post Featured Ad'])}</button>
        <button class="register-vit" id="submit">${sl(['ثبت و نمایش در ویترین', 'Vitrinde İlan ver', 'Post Ad to Showcase'])}</button>
        <div class="clear"></div>
        <div class="tovip">
            <p>${sl(['یکی از پکیج های زیر را برای ثبت ویژه آگهی انتخاب کنید  ', 'İlana Özel Kayıt İçin Aşağıdaki Tarifelerden Birini Seçiniz ', 'Select one of the packages to add as Featured Ad '])}: </p>
            <label class="form-radiolabel col-md-12">
                <input type="radio" class="form-radio" checked required="" name="itype" value="1">
                <span class="form-radio-styler" aria-hidden="true"></span><span class="vpl">${sl(["يك  روزه ", 'Bir Gün', 'One day'])} (2 ${sl(["لیر", 'Lira', 'Lear'])})</span>
            </label>
            <label class="form-radiolabel col-md-12">
                <input type="radio" class="form-radio" required="" name="itype" value="3">
                <span class="form-radio-styler" aria-hidden="true"></span><span class="vpl">${sl(["سه  روزه ", 'Üç Gü', 'Three days'])} (5 ${sl(["لیر", 'Lira', 'Lear'])})</span>
            </label>
            <label class="form-radiolabel col-md-12">
                <input type="radio" class="form-radio" required="" name="itype" value="7">
                <span class="form-radio-styler" aria-hidden="true"></span><span class="vpl">${sl(["هفت  روزه ", 'Yedi Gün', 'Seven days'])} (10 ${sl(["لیر", 'Lira', 'Lear'])})</span>
            </label>
            <button class="vipit">${sl(['پرداخت', 'Şimdi Öde', 'Pay'])}</button>
            <div class="clear"></div>
        </div>
        <div class="tovit">
            <p>${sl(['یکی از پکیج های زیر را برای نمایش در ویترین انتخاب کنید  ', 'İlana Özel Kayıt İçin Aşağıdaki Tarifelerden Birini Seçiniz ', 'Select one of the packages to add advertise in showcase '])} : </p>
            <label class="form-radiolabel col-md-12">
                <input type="radio" class="form-radio" checked required="" name="ttype" value="3">
                <span class="form-radio-styler" aria-hidden="true"></span><span class="vpl">${sl(["سه  روزه ", 'Üç Gün', 'Three day'])} (8 ${sl(["لیر", 'Lira', 'Lear'])})</span>
            </label>
            <label class="form-radiolabel col-md-12">
                <input type="radio" class="form-radio" required="" name="ttype" value="5">
                <span class="form-radio-styler" aria-hidden="true"></span><span class="vpl">${sl(["هفت   روزه ", 'Yedi Gün', 'Seven days'])} (15 ${sl(["لیر", 'Lira', 'Lear'])})</span>
            </label>
            <label class="form-radiolabel col-md-12">
                <input type="radio" class="form-radio" required="" name="ttype" value="10">
                <span class="form-radio-styler" aria-hidden="true"></span><span class="vpl">${sl(["ده روزه", 'On Gün', 'Ten days'])} (20 ${sl(["لیر", 'Lira', 'Lear'])})</span>
            </label>
            <button class="vitit">${sl(['پرداخت', 'Şimdi Öde', 'Pay'])}</button>
        </div>
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
    $("input[data-type='currency']").on({
        keyup: function() {
          formatCurrency($(this));
        },
        blur: function() { 
          // formatCurrency($(this), "blur");
        }
    });
    $('body').click(function() {
        // console.log($("input[data-type='currency']"));
        $("input[data-type='currency']").focusout();
    });
    $('.select').on('click', '.placeholder', function() {
        var parent = $(this).closest('.select');
        if (!parent.hasClass('is-open')) {
            parent.addClass('is-open');
            $('.select.is-open').not(parent).removeClass('is-open');
        } else {
            parent.removeClass('is-open');
        }
    }).on('click', 'ul>li', function() {
        var parent = $(this).closest('.select');
        parent.removeClass('is-open').find('.placeholder').text($(this).text());
        parent.find('input[type=hidden]').attr('value', $(this).attr('data-value'));
    });
});

var cat = null;

$('body').on('click', '.dropdown-selected .dropdown-link', function() {
    cat = null;
    // console.log($($('.dropdown-item.dropdown-selected').find('*')[3]).text().trim());
    if ($($('.dropdown-item.dropdown-selected').find('*')[3]).html() != undefined) {
        if (lang == 0) {
            cat = $($('.dropdown-item.dropdown-selected').find('*')[3]).text().trim().split('،').join('').split(' ').join('_').split('__').join('_');
        } else if (lang == 1) {
            cat = cd[$($('.dropdown-item.dropdown-selected').find('*')[3]).text().trim()].trim().split('،').join('').split(' ').join('_').split('__').join('_');
        } else {
            cat = ce[$($('.dropdown-item.dropdown-selected').find('*')[3]).text().trim()].trim().split('،').join('').split(' ').join('_').split('__').join('_');
        }
        // $('.attrs').slideDown(100);
    }
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
    $('.uinf').slideUp(100);
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
        toggleText: sl(["همه ی آگهی ها", "Tüm İlanlar", "All Ads"]),
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
        // console.log("setAllPanelOpen");
        $(aId + ' .panel-collapse:not(".in")').collapse('show');
    }
    closeAllPanels = function(aId) {
        // console.log("setAllPanelclose");
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
//                          alert("آگهی شما با موفقیت ثبت شد !");
//                          window.location = '/';
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
        headers: {
            "Content-Type": "application/json"
        },
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

$('.select').on('click', '.placeholder', function() {
    var parent = $(this).closest('.select');
    if (!parent.hasClass('is-open')) {
        parent.addClass('is-open');
        $('.select.is-open').not(parent).removeClass('is-open');
    } else {
        parent.removeClass('is-open');
    }
}).on('click', 'ul>li', function() {
    var parent = $(this).closest('.select');
    parent.removeClass('is-open').find('.placeholder').text($(this).text());
    parent.find('input[type=hidden]').attr('value', $(this).attr('data-value'));
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
    // $('.attrs').html('');
    if ($('#city').val() == "" || $('#city').val() == "0") {
        janelaPopUp.abre("id", 'p orange alert', sl(['خطا', 'Hata', 'Error']), sl(['شهر انتخاب شده مجاز نیست', 'Seçilen şehre izin verilmiyor', 'Selected city is not active']));
        return false;
    }
    let name = null
    if ($($('.dropdown-item.dropdown-selected').find('*')[3]).html() != undefined) {
        console.log($($('.dropdown-item.dropdown-selected').find('*')[3]).text().trim())
        if (lang == 0) {
            name = $($('.dropdown-item.dropdown-selected').find('*')[3]).text().trim().split('،').join('').split(' ').join('_').split('__').join('_');
        } else if (lang == 1) {
            name = cd[$($('.dropdown-item.dropdown-selected').find('*')[3]).text().trim()].trim().split('،').join('').split(' ').join('_').split('__').join('_');
        } else {
            name = ce[$($('.dropdown-item.dropdown-selected').find('*')[3]).text().trim()].trim().split('،').join('').split(' ').join('_').split('__').join('_');
        }
    }
    let city = $('#city').val();
    let data = {
        _sort: 'created_at:desc'
    };
    if (name != null) {
        data['class'] = name;
    }
    if ($('#wpo:checked').length) {
        data['hasImage'] = true;     
    }
    if ($('#ivip:checked').length) {
        data['vip'] = true;     
    }
    if (city != "") {
        data['city'] = city;
    }
    $('.attrs').find('input, select').each(function() {
        if ($(this).val() !== '' && $(this).val() !== '0') {
            data[$(this).attr('id')] = $(this).val().trim();
        }
    });
    // console.log(data);
    strapi.advertise.find(data).then(results => {
        // console.log('clear')
        $('.attrs').html('');
        // console.log(cat, map[cat]);
        if (map[cat] != undefined || cat != null) {
            // console.log('fill again');
            map[cat].fields.forEach(function(field) {
                switch (field.type) {
                    case 'range': {
                        let tp = 'type="text"';
                        if (['price', 'rent', 'deposits'].includes(field.name)) {
                            tp = `type="number" step="100000" min="0"`
                        }
                        var element = $(`
                            <div class="col-md-2 col-xs-6">
                                <div class="title">${field.caption[lang]} : </div>
                                <div class="content">
                                    <div class="col-md-6">
                                        <input id="${field.name}_gt" placeholder="${field.from[lang]}" ${tp}>
                                    </div>
                                    <div class="col-md-6">
                                        <input id="${field.name}_lt" placeholder="${field.to[lang]}" ${tp}>
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
                                <div class="title">${field.caption[lang]} : </div>
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
                                <div class="title">${field.caption[lang]} : </div>
                                <div class="content">
                                    <div class="col-md-12">
                                        <select id="${field.name + (field.input == 'int' ? '_gt' : '')}">
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
                                <div class="title">${field.caption[lang]} : </div>
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
                                <div class="title">${field.caption[lang]} : </div>
                                <div class="content">
                                    <div class="col-md-12">
                                        <input id="${field.name}_gt" type="text" placeholder="...">
                                    </div>
                                </div>
                            </div>
                        `);
                        break;
                    }
                }
                $('.attrs').append(element);
            });
        }
        $('.adv').html(``);
        $('.rsa').hide();
        $('#adv .search').html(`<i class="material-icons">hourglass_empty</i>`);
        if (results.length) {
            if (map[cat] != undefined || cat != null) {
                $(".fsi").fadeIn(100);
                $('.attrs').slideDown(100);
            } else {
                $(".fsi").fadeOut(100);
            }
            // $('.features').fadeOut(100);
            // $('.adv').html(`
            //     <div class="cross-line rsa">
            //         <span>${sl(['نتایج جستجوی آگهی', 'İlan başarıyla kaydedildi', 'Results'])}</span>
            //     </div>
            // `)
            results.forEach(function(ad) {
                $('.rsa').show();
                fads[ad.id] = ad;
                data = ad;
                console.log(data.class.split('_').join(' '), dc[data.class.split('_').join(' ')], ec[data.class.split('_').join(' ')]);
                $('.adv').append(`
                    <div class="col-lg-4 col-md-6 col-sm-12 col-xs-12 ${(lang == 0 ? 'fr' : '')}">
                        <div class="blog-card${(ad.vip) ? ' vip' : ''}">
                            <div class="meta">
                                <a data-id='${ad.id}' class="photo view" style="background-image: url(${(ad.images.length ? ad.images[0].url : '/assets/images/def.jpg')})"></a>
                            </div>
                            <div class="description">
                                <h1>${data.title}</h1>
                                <h2>${timeSince(new Date(data.created_at).getTime())}</h2>
                                <h2 class='hidden-xs'><span class='ct'>${sl(['دسته بندی ', 'Kategori ', 'Category '])}</span> : ${(lang == 0 ? data.class.split('_').join(' ') : (lang == 1 ? dc[data.class.split('_').join(' ')] : ec[data.class.split('_').join(' ')]))}</h2>
                                <p class="read-more">
                                    <a data-id='${ad.id}'class="view" href="#">${sl(['مشاهده', 'İncele', 'View'])}</a>
                                    ${(ad.vip) ? `<p data-id='${ad.id}'class="vip">${sl(['ویژه', 'özel', 'Featured Ads'])}</p>` : ''}
                                </p>
                            </div>
                        </div>
                    </div>
                `)
            });
            $([document.documentElement, document.body]).animate({
                scrollTop: $(".cross-line").offset().top - 100
            }, 600);
            $('#adv .search').html(sl([`جستجو...`, 'Ara...', 'Search...']));
        } else {
            $(".fsi").fadeOut(100);
            $('#adv .search').html(sl([`جستجو...`, 'Ara...', 'Search...']));
            $('.attrs').slideUp(100);
            janelaPopUp.abre("id", 'p blue alert', sl(['خطا', 'Hata', 'Error']), sl(['نتیجه ای یافت نشد', 'Sonuç bulunamadı', 'No result found ']));
        }
    });
    //    fads = {};
    //    $('.adv').html('');
    // var t = [];
    // t.push($("#adv #city").val());
    // if ($('.dropdown.dropdown-below > a .dropdown-text').length && $('.dropdown.dropdown-below > a .dropdown-text').html().trim().replace('\n', '') != 'همه ی آگهی ها') {
    //  t.push($('.dropdown.dropdown-below > a .dropdown-text').html().trim().replace('\n', ''));
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
    //      var rs = _resp.filter((ad, i) => {
    //          data = JSON.parse(ad.info);
    //          if (parseInt(data.size) < ($('#sizef').val() == '' ? 0 : $('#sizef').val()) || parseInt(data.size) > ($('#sizet').val() == '' ? Infinity : $('#sizet').val())) return false;
    //          if (parseInt(data.cy) < parseInt($('#yearf').val()) || parseInt(data.cy) > (parseInt($('#yeart').val()) == 0 ? Infinity : parseInt($('#yeart').val()))) return false;
    //          if (parseInt(data.price) < ($('#pricef').val() == '' ? 0 : $('#pricef').val()) || parseInt(data.price) > ($('#pricet').val() == '' ? Infinity : $('#pricet').val())) return false;
    //          if (($('#roomn').val() == '' ? false : (parseInt(data.rn) != $('#roomn').val()))) return false;
    //          return true;
    //      });
    //            if (rs.length) {
    //                $('.features').fadeOut(100);
    //                $('.adv').html(`
    //                    <div class="cross-line">
    //                        <span>نتایج جستجوی آگهی</span>
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
    if (user == null) {
        janelaPopUp.abre("id", 'p orange alert', sl(['خطا', 'Hata', 'Error']), sl(['برای ثبت آگهی ابتدا باید وارد شوید', 'Bir İlan ver için önce giriş yapmalısınız', 'You need to login for adding an advertise']));
        $(this).html(sl([`ثبت آگهی`, 'İlan ver', 'Post Ad']));
        return false;
    }
    e.preventDefault();
    ai = [];
    an = 0;
    $('.addv').fadeIn(300);
    $('html').css('overflow-y', 'hidden');
});

$('.closev').click(function(e) {
    $('.select').on('click', '.placeholder', function() {
        var parent = $(this).closest('.select');
        if (!parent.hasClass('is-open')) {
            parent.addClass('is-open');
            $('.select.is-open').not(parent).removeClass('is-open');
        } else {
            parent.removeClass('is-open');
        }
    }).on('click', 'ul>li', function() {
        var parent = $(this).closest('.select');
        parent.removeClass('is-open').find('.placeholder').text($(this).text());
        parent.find('input[type=hidden]').attr('value', $(this).attr('data-value'));
    });
    e.preventDefault();
    $('.addv').fadeOut(300);
    ai = [];
    an = 0;
    $('html').css('overflow-y', 'scroll');
});

$('body').on('click', '.view', async function(e) {
    $('.cp').html(sl(['کپی', 'Kopya', 'Copy']));
    e.preventDefault();
    $('.advl .mark').html(sl(['نشان  کردن', 'Favori', 'Mark']));
    $('.advl .mark').attr('data-type', 'mark');
    $('html').css('overflow-y', 'hidden');
    console.log(strapi.advertise);
    let ad = await strapi.advertise.findOne($(this).attr('data-id'));
    let data = ad;
    if (user != null) {
        if (user.marks.map(ad => ad.id).includes(ad.id)) {
            $('.advl .mark').html(sl(['نشان شده', 'Favorilerine Eklendi', 'Marked']));
            $('.advl .mark').attr('data-type', 'marked');
        }
    }
    $('.advl #carousel .carousel-inner').html('');
    $('.advl #thumbcarousel .carousel-inner .item').html('<div class="clear"></div>');
    $('.advl .fields').html('');
    $('.advl .ago').html(`${timeSince(new Date(data.created_at).getTime())}`);
    $('.advl .tp a').html(`${data.phone}`);
    $('.advl .tp a').attr('href', `tel:${data.phone}`);
    $('.advl .mark').attr('data-addid', data.id);
    if (ad.images.length != 0) {
        ad.images.forEach(function(a, i) {
            if (i == 0) {
                $('.advl #carousel .carousel-inner').append(`
                    <div class="item active">
                        <img src="${a.url}">
                    </div>
                `);
            } else {
                $('.advl #carousel .carousel-inner').append(`
                    <div class="item">
                        <img src="${a.url}">
                    </div>
                `);
            }
        });
        ad.images.forEach(function(a, i) {
            $('.advl #thumbcarousel .carousel-inner .item').prepend(`
                <div data-target="#carousel" data-slide-to="${i}" class="thumb"><img src="${a.url}"></div>
            `);
        });
    } else {
        $('.advl #carousel .carousel-inner').append(`
            <div class="item active">
                <img src="data:image/png;base64,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">
            </div>
        `);
        $('.advl #thumbcarousel .carousel-inner .item').prepend(`
            <div data-target="#carousel" data-slide-to="0" class="thumb"><img src="data:image/png;base64,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"></div>
        `);
    }
    $(this).ready(function() {
        $('#carousel img').css('height', $('.message').width());
    })
    $('.advl .title').html(data.title);
    $('.advl .desc').html(data.description);
    console.log(data);
    for (let t in map.dic) {
        // console.log(t, ' : ', data[t]);
        if (data[t] != undefined) {
            if (['price', 'rent', 'deposits'].includes(t)) {
                data[t] = parseInt(data[t]).format() + ' ₺';
            }
            if (t == 'class') {
                data[t] = data[t].split('_').join(' ');
            }
            if (t == 'class') { 
                $('.advl .fields').append(`
                    <div class="data">
                        <div class="field">${map.dic[t][lang]}</div>
                        <div class="value">${(lang == 0 ? data[t] : (lang == 1 ? dc[data[t]] : ec[data[t]]))}</div>
                    </div>
                `);
            } else if (t == 'city') {
                $('.advl .fields').append(`
                    <div class="data">
                        <div class="field">${map.dic[t][lang]}</div>
                        <div class="value">${(lang == 0 ? data[t] : cc[data[t]])}</div>
                    </div>
                `);
            } else if (t == 'education') {
                $('.advl .fields').append(`
                    <div class="data">
                        <div class="field">${map.dic[t][lang]}</div>
                        <div class="value">${(lang == 2 ? data[t] : mc[data[t]][lang])}</div>
                    </div>
                `);
            } else {
                $('.advl .fields').append(`
                    <div class="data">
                        <div class="field">${map.dic[t][lang]}</div>
                        <div class="value">${data[t]}</div>
                    </div>
                `);
            }
        }
    }
    $('.advl').fadeIn(300);
});

$('.message a').click(function() {
    $('form').animate({
        height: "toggle",
        opacity: "toggle"
    }, "slow");
});

$('.soon').click(function(e) {
    janelaPopUp.abre("id", 'p purple alert', sl(['به زودی', 'Yakında', 'Soon']), sl(['به زودی این بخش راه اندازی خواهد شد', 'Yakında açılacak', 'This section is under construction']));
});

$('.cp').click(function() {
    $('.cp').html(sl(['کپی شد', 'Kopyalandı', 'Copied']))
    copyToClipboard($(".tp").get(0));
});

// jQuery(document).trigger("enhance");

// const wrapper = document.getElementsByClassName('wrapper');
// const button = document.getElementById('click');
// const button2 = document.getElementById('click2');

// button.addEventListener('click', clicked);
// button2.addEventListener('click', clicked2);
// let scroll = 0;
// $(wrapper[0]).animate({'scrollLeft': scroll}, 'slow');

// wrapper[0].addEventListener("scroll", function (event) {
//   scroll = wrapper[0].scrollLeft;
// });

// function clicked () {
//   // scroll = scroll += ($('.wrapper').get(0).scrollWidth - $('.wrapper').width()) / 5;
//   scroll = scroll += 250 / 2;
//     $(wrapper[0]).animate({'scrollLeft': scroll}, 'slow');
//   scroll = wrapper[0].scrollLeft + 50;
//   console.log(wrapper[0].scrollLeft);
// }

// function clicked2 () {
//   scroll = scroll -= 250 / 2;
//     $(wrapper[0]).animate({'scrollLeft': scroll}, 'slow');
//   scroll = wrapper[0].scrollLeft + 50;
// }

$('.gci').click(function() {
    $('.uinf').slideDown(300);
});

$('.logout').click(function() {
    strapi.logout();
    window.location = locations[lang];
});

$('.mark').click(function() {
    let addid = $(this).attr('data-addid');
    let t = $(this).attr('data-type');
    if (user != null) {
        if (t == 'mark') {
            strapi.advertise.mark(addid).then(function(e) {
                user = e;
                $('.advl .mark').html(sl(['نشان  شده', 'Favorilerine Eklendi', 'Marked']));
                $('.advl .mark').attr('data-type', 'marked');
            });
        } else {
            strapi.advertise.unmark(addid).then(function(e) {
                user = e;
                $('.advl .mark').html(sl(['نشان  کردن', 'Favori', 'Mark']));
                $('.advl .mark').attr('data-type', 'mark');
            });
        }
    } else {
        janelaPopUp.abre("id", 'p orange alert', sl(['خطا', 'Hata', 'Error']), sl(['برای نشان کردن آگهی ابتدا باید وارد شوید', 'İlan favori kaydetemk için önce giriş yapmalısınız', 'You need to login for marking an advertise']));
    }
});

function formatNumber(n) {
  // format number 1000000 to 1,234,567
  return n.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}

function formatCurrency(input, blur) {
  // appends $ to value, validates decimal side
  // and puts cursor back in right position.
  
  // get input value
  var input_val = input.val();
  
  // don't validate empty input
  if (input_val === "") { return; }
  
  // original length
  var original_len = input_val.length;

  // initial caret position 
  var caret_pos = input.prop("selectionStart");
    
  // check for decimal
  if (input_val.indexOf(".") >= 0) {

    // get position of first decimal
    // this prevents multiple decimals from
    // being entered
    var decimal_pos = input_val.indexOf(".");

    // split number by decimal point
    var left_side = input_val.substring(0, decimal_pos);
    var right_side = input_val.substring(decimal_pos);

    // add commas to left side of number
    left_side = formatNumber(left_side);

    // validate right side
    right_side = formatNumber(right_side);
    
    // On blur make sure 2 numbers after decimal
    if (blur === "blur") {
      right_side += "00";
    }
    
    // Limit decimal to only 2 digits
    right_side = right_side.substring(0, 2);

    // join number by .
    input_val = "₺" + left_side + "." + right_side;

  } else {
    // no decimal entered
    // add commas to number
    // remove all non-digits
    input_val = formatNumber(input_val);
    input_val = "₺" + input_val;
    
    // final formatting
    if (blur === "blur") {
      // input_val += ".00";
    }
  }
  
  // send updated string to input
  input.val(input_val);

  // put caret back in the right position
  var updated_len = input_val.length;
  caret_pos = updated_len - original_len + caret_pos;
  input[0].setSelectionRange(caret_pos, caret_pos);
}

$('.wrapper').scrollLeft(0);

var vmd = true; 

$('.wrapper').mouseenter(function() {
    vmd = false;
})

$('.wrapper').mouseleave(function() {
    setTimeout(function() {
        vmd = true;
    }, 1000);
});

$('.wrapper').stop().animate({scrollLeft:0}, 800, 'swing', function() { 
});
function vits() {
    let sw = wrapper[0].scrollWidth;
    let sp = wrapper[0].scrollLeft;
    console.log(sw, sp, Math.abs((sw - $('.wrapper').width()) - sp));
    if (Math.abs((sw - $('.wrapper').width()) - sp) < 50) {
        $('.wrapper').stop().animate({scrollLeft:0}, 800, 'swing', function() { 
        });
    }
    if (vmd) {
        clicked();
    }
    setTimeout(function() {
        vits();
    }, 3000);
}

// vits();

$(".vc").click(function() {
    $('.pc .vt').fadeOut(300);
    $('.pc .vp').fadeOut(300);
    $('.pc').fadeOut(300);
});

$('body').on('click', '.dvip', function() {
    let id = $(this).attr('data-id');
    $('.pc').fadeIn(300);
    $('.pc .vp').fadeIn(300);
});

$('body').on('click', '.dvit', function() {
    let id = $(this).attr('data-id');
    $('.pc').fadeIn(300);
    $('.pc .vt').fadeIn(300);
});

// $(document).ready(function () {
//     $('#carousel-example').carousel({
//         // interval: 1200,
//         // cycle: true 
//     });
// });

$('.rmo').click(function(e) {
    e.preventDefault();
    if ($('.ds').hasClass('col-md-12')) {
        $(this).html('بیشتر');
        if ($(window).width() < 700){
            $('#au').addClass('lh');
        }
        $('.ds').toggleClass('col-md-12');
        setTimeout(function() {
            $('.ts').fadeToggle(500);
        }, 500);
    } else {
        $(this).html('کمتر');
        $('.ts').fadeToggle(500);
        setTimeout(function() {
            if ($(window).width() < 700){
                $('#au').removeClass('lh');
            }
            $('.ds').toggleClass('col-md-12');
        }, 500);
    }

});

(function($) {

    $.circleMenu = function(el, options) {
        var plugin = this;
        var $el = $(el);
        var $toggle, $links;
        var open = false,
            nbLinks, multip = 1,
            dir;

        plugin.options = $.extend({
            direction: 'up', // up down right left
            position: {
                x: 'right',
                y: 'bottom'
            }
        }, options);

        plugin.init = function() {
            switch (plugin.options.position.x) {
                case 'right':
                    $el.css('right', '15px');
                    break;
                case 'left':
                    $el.css('left', '15px');
                    break;
                default:
                    $el.css('right', '15px');
            }
            switch (plugin.options.position.y) {
                case 'top':
                    $el.css('top', '15px');
                    break;
                case 'bottom':
                    $el.css('bottom', '15px');
                    break;
                default:
                    $el.css('bottom', '15px');
            }
            plugin.createToggle();
            plugin.createLink();
            plugin.initEvents();
        }
        plugin.createToggle = function() {
            //create button
            $toggle = $(document.createElement('button'));
            $toggle.addClass('circle-menu-toggle');

            //create icon
            $icon = $(document.createElement('i'));
            $icon.addClass('fa fa-globe');
            $icon.prop("aria-hidden", true);

            $toggle.append($icon);
            $el.append($toggle);
        }
        plugin.createLink = function() {
            $links = $el.find('li');
            nbLink = $links.length;
            switch (plugin.options.direction) {
                case 'up':
                    dir = 'Y';
                    multip = -1;
                    break;
                case 'down':
                    dir = 'Y';
                    multip = 1;
                    break;
                case 'right':
                    dir = 'X';
                    multip = 1;
                    break;
                case 'left':
                    dir = 'X';
                    multip = -1;
                    break;
                default:
                    dir = 'Y';
                    multip = -1;
            }
            plugin.close();
        }
        plugin.initEvents = function() {
            $toggle.click(function() {
                plugin.handleClick(plugin, $el);
            });
        }
        plugin.handleClick = function(plugin, $el) {
            open = !open;
            if (open) {
                plugin.open();
            } else {
                plugin.close();
            }
        }
        plugin.open = function() {
            $links.each(function(index) {
                plugin.css($(this), 'transition-delay', ((nbLink - index) * 0.1) + 's');
                plugin.css($(this), 'transform', 'translate' + dir + '(' + (multip * (index + 1) * ($(this).height() + 10)) + 'px) scale(1)');
            });
        }
        plugin.close = function() {
            $links.each(function(index) {
                plugin.css($(this), 'transition-delay', ((index + 1) * 0.1) + 's');
                plugin.css($(this), 'transform', 'translate' + dir + '(0px) scale(0)');
            });

        }
        plugin.css = function($el, prop, value) {
            $el.css(prop, value);
            $el.css('-webkit-' + prop, value);
            $el.css('-ms-' + prop, value);
            $el.css('-moz-' + prop, value);
            $el.css('-o-' + prop, value);
        }




        plugin.init();
    }


    $.fn.circleMenu = function(options) {
        return this.each(function() {
            console.log($(this).attr('upgraded'));
            if ($(this).attr('upgraded') == undefined) {
                var plugin = new $.circleMenu(this, options);
                $(this).attr('upgraded', 'true');
            }
        });

    }

}(jQuery));

$('#menu1').circleMenu({
    direction: 'down',
    position: {
        x: 'left',
        y: 'top'
    }
});
$('#menu2').circleMenu({
    direction: 'left',
    position: {
        x: 'right',
        y: 'top'
    }
});
$('#menu3').circleMenu({
    direction: 'right',
    position: {
        x: 'left',
        y: 'bottom'
    }
});
$('#menu4').circleMenu({
    direction: 'up',
    position: {
        x: 'right',
        y: 'bottom'
    }
});

function validaten(evt) {
  var theEvent = evt || window.event;
  if (theEvent.type === 'paste') {
      key = event.clipboardData.getData('text/plain');
  } else {
      var key = theEvent.keyCode || theEvent.which;
      key = String.fromCharCode(key);
  }
  var regex = /[0-9]|\./;
  if( !regex.test(key) ) {
    theEvent.returnValue = false;
    if(theEvent.preventDefault) theEvent.preventDefault();
  }
}

$(function() {
    //----- OPEN
    $('[pd-popup-open]').on('click', function(e)  {
        var targeted_popup_class = jQuery(this).attr('pd-popup-open');
        $('[pd-popup="' + targeted_popup_class + '"]').fadeIn(100);
 
        e.preventDefault();
    });
    //----- CLOSE
    $('[pd-popup-close]').on('click', function(e)  {
        var targeted_popup_class = jQuery(this).attr('pd-popup-close');
        $('[pd-popup="' + targeted_popup_class + '"]').fadeOut(200);
        e.preventDefault();
    });
});

$('.popup-inner').click(function(event) {
    event.stopPropagation();
});


if (user && user.statusCode == 401) {
    $('.logout').trigger('click');
}

$('document').ready(function() {
    $('.bgo').css('height', $( window ).height());
});