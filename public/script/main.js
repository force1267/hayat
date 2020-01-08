var lang = 0; // 0 => fa, 1 => tr, 2 => en

Number.prototype.format = function(n, x) {
    var re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\.' : '$') + ')';
    return this.toFixed(Math.max(0, ~~n)).replace(new RegExp(re, 'g'), '$&,');
};

function copyToClipboard(elem) {
      // create hidden text element, if it doesn't already exist
    var targetId = "_hiddenCopyText_";
    var isInput = elem.tagName === "INPUT" || elem.tagName === "TEXTAREA";
    var origSelectionStart, origSelectionEnd;
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
    return interval + " سال پیش";
  }
  interval = Math.floor(seconds / 2592000);
  if (interval > 1) {
    return interval + " ماه پیش";
  }
  interval = Math.floor(seconds / 86400);
  if (interval > 1) {
    return interval + " روز پیش";
  }
  interval = Math.floor(seconds / 3600);
  if (interval > 1) {
    return interval + " ساعت پیش";
  }
  interval = Math.floor(seconds / 60);
  if (interval > 1) {
    return interval + " دقیقه پیش";
  }
  return Math.floor(seconds) + " ثانیه پیش";
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
        $('.useri').attr('src', (user.avatar == null) ? '/uploads/udef.jpg': user.avatar.url);
        user.advertises.forEach(function(ad) {
            let data = ad;
            $('.uads').append(`
                <div class="col-md-4 col-sm-6 col-xs-12 fr">
                    <div class="blog-card">
                        <div class="meta">
                            <div class="photo" style="background-image: url(${(ad.images.length ? ad.images[0].url : '/uploads/def.jpg')})"></div>
                        </div>
                        <div class="description">
                            <h1>${data.title}</h1>
                            <h2>${timeSince(new Date(data.created_at).getTime())}</h2>
                            <h2><span class='ct'>دسته بندی </span> : ${data.class.split('_').join(' ')}</h2>
                            <p class="read-more">
                                <a data-id='${ad.id}'class="delete" href="#">پاک کردن</a>
                            </p>
                        </div>
                    </div>
                </div>
            `);
        });
        user.marks.forEach(function(ad) {
            let data = ad;
            $('.umks').append(`
                <div class="col-md-4 col-sm-6 col-xs-12 fr">
                    <div class="blog-card">
                        <div class="meta">
                            <div class="photo" style="background-image: url(${(ad.images.length ? ad.images[0].url : '/uploads/def.jpg')})"></div>
                        </div>
                        <div class="description">
                            <h1>${data.title}</h1>
                            <h2>${timeSince(new Date(data.created_at).getTime())}</h2>
                            <h2><span class='ct'>دسته بندی </span> : ${data.class.split('_').join(' ')}</h2>
                            <p class="read-more">
                                <a data-id='${ad.id}'class="view" href="#">مشاهده</a>
                                <!--<p data-id='${ad.id}'class="vip">ویژه</p> -->
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
    if (confirm('مطمعنید که میخواهید این تبلیغ را حذف کنید ؟')) {
        strapi.advertise.delete(ad).then(e=> {
            janelaPopUp.abre("id", 'p blue alert', 'انجام شد', 'با موفقیت حذف شد');
            $(this).parent().parent().parent().remove();
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
        $('.useri').attr('src', (user.avatar == null) ? '/uploads/udef.jpg': user.avatar.url);
        user.advertises.forEach(function(ad) {
            let data = ad;
            $('.uads').append(`
                <div class="col-md-4 col-sm-6 col-xs-12 fr">
                    <div class="blog-card">
                        <div class="meta">
                            <div class="photo" style="background-image: url(${(ad.images.length ? ad.images[0].url : '/uploads/def.jpg')})"></div>
                        </div>
                        <div class="description">
                            <h1>${data.title}</h1>
                            <h2>${timeSince(new Date(data.created_at).getTime())}</h2>
                            <h2><span class='ct'>دسته بندی </span> : ${data.class.split('_').join(' ')}</h2>
                            <p class="read-more">
                                <a data-id='${ad.id}'class="delete" href="#">پاک کردن</a>
                            </p>
                        </div>
                    </div>
                    ${(!ad.vip) ? `<div data-id="${ad.id}" class="dvip">ویژه کردن آگهی</div>` : ''}
                    ${(ad.showcase == 0) ? `<div data-id="${ad.id}" class="dvit">نمایش در ویترین</div>` : ''}
                </div>
            `);
        });
        user.marks.forEach(function(ad) {
            let data = ad;
            $('.umks').append(`
                <div class="col-md-4 col-sm-6 col-xs-12 fr">
                    <div class="blog-card">
                        <div class="meta">
                            <div class="photo" style="background-image: url(${(ad.images.length ? ad.images[0].url : '/uploads/def.jpg')})"></div>
                        </div>
                        <div class="description">
                            <h1>${data.title}</h1>
                            <h2>${timeSince(new Date(data.created_at).getTime())}</h2>
                            <h2><span class='ct'>دسته بندی </span> : ${data.class.split('_').join(' ')}</h2>
                            <p class="read-more">
                                <a data-id='${ad.id}'class="view" href="#">مشاهده</a>
                                <!--<p data-id='${ad.id}'class="vip">ویژه</p> -->
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
        janelaPopUp.abre( "id", 'p green alert',  'انجام شد' ,  'اطلاعات شما با موفقیت ذخیره شد!');
    })
    .catch(e=> {
        janelaPopUp.abre( "id", 'p oragne alert',  'خطا' ,  'خطا در ذخیره اطلاعات');
    });
    
});

if (strapi.jwt != null) {
    strapi.user.me().then(e=> {
        user = e;
        $('.iul').html(`<span class="uss">${e.username}</span>`);
    });
    strapi.user.me().then(e=> {
        user = e;
        $('.ussp').html(`<span style="color: #fff !important;font-size: 13px;position: relative;left: 141px;top: 5px;padding: 1px 20px;border-radius: 40px !important;border: 1px solid #fff;font-weight: 400;white-space: nowrap;">${e.username}</span>`);
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

$('.closep').click(function() {
    $('.cover').fadeOut(300);
    $('html').css('overflow-y', 'scroll');
});

$('.uss').click(function() {
    $('.cover').fadeIn(300);
});

$(function() {
    // Multiple images preview in browser
    var imagesPreview = function(input, placeToInsertImagePreview) {

        if (input.files) {
            var filesAmount = input.files.length;
                    placeToInsertImagePreview.html('<div class="clear"></div>');

            for (i = 0; i < filesAmount; i++) {
                var reader = new FileReader();

                reader.onload = function(event) {
                    $(`
                    <span>
                        <img src="${event.target.result}">
                    </span>
                    `).prependTo(placeToInsertImagePreview);

                }
                reader.readAsDataURL(input.files[i]);
            }
        }

    };

    $('body').on('change', '#file', function() {
        imagesPreview(this, $(this).parent().parent().find('.upi'));
    });
    $('body').on('change', '#uupl', function() {
        imagesPreview(this, $('.uupi'));
    });
});

var map = {
    dic: {
        'class': ['دسته بندی', '', ''],
        'city': ['شهر', '', ''],
        'price': ['قیمت', '', ''],
        'areaOfBuilding': ['متراژ', '', ''],
        'ageOfBuilding': ['سن ساختمان', '', ''],
        'numberOfRooms': ['تعداد اتاق', '', ''],
        'deposits': ['ودیعه', '', ''],
        'rent': ['اجاره', '', ''],
        'manufacturer': ['سازنده', '', ''],
        'kilometers': ['کارکرد', '', ''],
    },
    'فروشی_مسکونی': {
        fields: [{
                name: 'areaOfBuilding',
                type: 'range',
                input: 'int',
                from: ['از', '', 'from'],
                to: ['تا', '', 'to'],
                caption: ['متراژ - متر مربع', '', ''],
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
                from: ['از ', '', 'from'],
                to: ['تا ', '', 'to'],
                caption: ['سن ساختمان', '', ''],
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
                caption: ['تعداد اتاق', '', 'minimum number of rooms'],
            },
            {
                name: 'price',
                type: 'range',
                input: 'int',
                from: ['از ', '', 'from'],
                to: ['تا ', '', 'to'],
                caption: ['قیمت (لیر)', '', 'rent'],
            },
        ],
    },
    'اجاره_مسکونی': {
        fields: [{
                name: 'areaOfBuilding',
                type: 'range',
                input: 'int',
                from: ['از', '', 'from'],
                to: ['تا', '', 'to'],
                caption: ['متراژ - متر مربع', '', ''],
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
                from: ['از ', '', 'from'],
                to: ['تا ', '', 'to'],
                caption: ['سن ساختمان', '', ''],
            },
            {
                name: 'numberOfRooms',
                type: 'list',
                input: 'int',
                list: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
                caption: ['تعداد اتاق', '', 'minimum number of rooms'],
            },
            {
                name: 'deposits',
                type: 'range',
                input: 'int',
                from: ['از ', '', 'from'],
                to: ['تا ', '', 'to'],
                caption: ['ودیعه (لیر)', '', 'deposits'],
            },
            {
                name: 'rent',
                type: 'range',
                input: 'int',
                from: ['از ', '', 'from'],
                to: ['تا ', '', 'to'],
                caption: ['اجاره (لیر)', '', 'rent'],
            },
        ],
    },
    'فروشی_تجاری': {
        fields: [{
                name: 'areaOfBuilding',
                type: 'range',
                input: 'int',
                from: ['از', '', 'from'],
                to: ['تا', '', 'to'],
                caption: ['متراژ - متر مربع', '', ''],
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
                from: ['از ', '', 'from'],
                to: ['تا ', '', 'to'],
                caption: ['سن ساختمان', '', ''],
            },
            {
                name: 'price',
                type: 'range',
                input: 'int',
                from: ['از ', '', 'from'],
                to: ['تا ', '', 'to'],
                caption: ['قیمت (لیر)', '', 'rent'],
            },
        ],
    },
    'اجاره_تجاری': {
        fields: [{
                name: 'areaOfBuilding',
                type: 'range',
                input: 'int',
                from: ['از', '', 'from'],
                to: ['تا', '', 'to'],
                caption: ['متراژ - متر مربع', '', ''],
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
                from: ['از ', '', 'from'],
                to: ['تا ', '', 'to'],
                caption: ['سن ساختمان', '', ''],
            },
            {
                name: 'numberOfRooms',
                type: 'list',
                input: 'int',
                list: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
                caption: ['تعداد اتاق', '', 'minimum number of rooms'],
            },
            {
                name: 'deposits',
                type: 'range',
                input: 'int',
                from: ['از ', '', 'from'],
                to: ['تا ', '', 'to'],
                caption: ['ودیعه (لیر)', '', 'deposits'],
            },
            {
                name: 'rent',
                type: 'range',
                input: 'int',
                from: ['از ', '', 'from'],
                to: ['تا ', '', 'to'],
                caption: ['اجاره (لیر)', '', 'rent'],
            },
        ],
    },
    'خودرو': {
        fields: [{
                name: 'manufacturer',
                type: 'list',
                input: 'list',
                list: ["Alfa Romeo", "Anadol", "Aston martin", "Audi", "Bentley", "BMW", "Bugatti", "Buick", "Cadillac", "Caterham", "Chery", "Chevrolet", "Chrysler", "Citroen", "Dacia", "Daewoo", "Daihatsu", "Dodge", "Ds Automobiles", "Ferrari", "Fiat", "Ford", "Geely", "Honda", "Hyundai", "Ikco", "Infinity", "Isuzu", "Jaguar", "Kia", "Lada", "Lamborghini", "Lancia", "Lexus", "Lincoln", "Lotus", "Maserati", "Mazda", "Mclaren", "Mercedes - benz", "Mercury", "MG", "Mini", "Mitsubishi", "Morgan", "Moskwitsch", "Nissan", "Oldsmobile", "Opel", "Peugeot", "Plymouth", "Pontiac", "Porsche", "Proton", "Renault", "Rolls-Royce", "Rover", "Saab", "Seat", "Skoda", "Smart", "Subaru", "Suzuki", "Tata", "Tesla", "Toyota", "Volkswagen", "Volvo"],
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
                caption: ['قیمت (لیر)', '', 'rent'],
            },
        ],
    },
    'لوازم_یدكی_خودرو': {
        fields: [{
            name: 'price',
            type: 'range',
            input: 'int',
            from: ['از ', '', 'from'],
            to: ['تا ', '', 'to'],
            caption: ['قیمت (لیر)', '', 'rent'],
        }, ],
    },
    'موتور_سیکلت_و_لوازم_یدکی': {
        fields: [{
            name: 'price',
            type: 'range',
            input: 'int',
            from: ['از ', '', 'from'],
            to: ['تا ', '', 'to'],
            caption: ['قیمت (لیر)', '', 'rent'],
        }, ],
    },
    'لپتاپ_و_كامپیوتر': {
        fields: [
            {
                name: 'manufacturer',
                type: 'list',
                input: 'list',
                list: ["Acer", "Advent", "Aidata", "Akai", "Alienware", "Apple Macbook", "Arçelik", "Asus", "Averatech", "Beko", "BenQ", "Brother", "Byron", "Casper", "Cbox", "Conpaq", "Crea", "Datron", "Dell", "Dente", "ECS", "Escort", "Exper", "Fujitsu", "Fujitsu Siemens", "Gateway", "Gericom", "Getac", "Gigabyte", "Google", "Grundig", "Haier", "Hitachi", "Hometech", "HP", "Huawei", "IBM", "Keysmart", "Lenovo", "LG", "Medion", "Microsoft", "Monster", "Msi", "NEC", "Packard Bell", "Panasonic", "Philips", "Probook", "Queen", "Razer", "Regal", "Samsung", "Smartbook", "Sony", "Sunny", "Toshiba", "Vestel", "Woon", "Xiaomi", "Yepo", "غيره ..."],
                caption: ['برند', '', 'اپل'],
            },
            {
                name: 'price',
                type: 'range',
                input: 'int',
                from: ['از ', '', 'from'],
                to: ['تا ', '', 'to'],
                caption: ['قیمت (لیر)', '', 'rent'],
            },
        ],
    },
    'دوربین_فیلم_برداری_و_عكاسی_و_ملزومات': {
        fields: [{
            name: 'price',
            type: 'range',
            input: 'int',
            from: ['از ', '', 'from'],
            to: ['تا ', '', 'to'],
            caption: ['قیمت (لیر)', '', 'rent'],
        }, ],
    },
    'صوتی_و_تصویری': {
        fields: [{
            name: 'price',
            type: 'range',
            input: 'int',
            from: ['از ', '', 'from'],
            to: ['تا ', '', 'to'],
            caption: ['قیمت (لیر)', '', 'rent'],
        }, ],
    },
    'موبایل_و_تبلت_و_ملزومات': {
        fields: [{
            name: 'price',
            type: 'range',
            input: 'int',
            from: ['از ', '', 'from'],
            to: ['تا ', '', 'to'],
            caption: ['قیمت (لیر)', '', 'rent'],
        }, ],
    },
    'كنسول_بازی_و_ملزومات': {
        fields: [{
            name: 'price',
            type: 'range',
            input: 'int',
            from: ['از ', '', 'from'],
            to: ['تا ', '', 'to'],
            caption: ['قیمت (لیر)', '', 'rent'],
        }, ],
    },
    'سایر_لوازم_الكترونیكی': {
        fields: [{
            name: 'price',
            type: 'range',
            input: 'int',
            from: ['از ', '', 'from'],
            to: ['تا ', '', 'to'],
            caption: ['قیمت (لیر)', '', 'rent'],
        }, ],
    },
    'آشپز_و_شیرینی_پز': {
        fields: [
        {
            name: 'workExperience',
            type: 'list',
            input: 'list',
            list: [0, 1, 2, 3, ['&#8734;', 1000]],
            caption: ['سابقه کاری', '', 'rent'],
        }, 
        {
            name: 'education',
            type: 'list',
            input: 'list',
            list: [['دیپلم', 'diploma'], ['کارشناسی', 'bachelor'], ['کارشناسی ارشد', 'masters'], ['دکترا', 'PhD'], ['پزشکی', 'Dr'], ['دندان پزشکی', 'dentist']],
            caption: ['مدرک', '', 'rent'],
        }, 
        ],
    },
    'نظافت': {
        fields: [
        {
            name: 'workExperience',
            type: 'list',
            input: 'list',
            list: [0, 1, 2, 3, ['&#8734;', 1000]],
            caption: ['سابقه کاری', '', 'rent'],
        }, 
        {
            name: 'education',
            type: 'list',
            input: 'list',
            list: [['دیپلم', 'diploma'], ['کارشناسی', 'bachelor'], ['کارشناسی ارشد', 'masters'], ['دکترا', 'PhD'], ['پزشکی', 'Dr'], ['دندان پزشکی', 'dentist']],
            caption: ['مدرک', '', 'rent'],
        }, 
        ],
    },
    'عمران_ساختمانی_و_معماری': {
        fields: [
        {
            name: 'workExperience',
            type: 'list',
            input: 'list',
            list: [0, 1, 2, 3, ['&#8734;', 1000]],
            caption: ['سابقه کاری', '', 'rent'],
        }, 
        {
            name: 'education',
            type: 'list',
            input: 'list',
            list: [['دیپلم', 'diploma'], ['کارشناسی', 'bachelor'], ['کارشناسی ارشد', 'masters'], ['دکترا', 'PhD'], ['پزشکی', 'Dr'], ['دندان پزشکی', 'dentist']],
            caption: ['مدرک', '', 'rent'],
        }, 
        ],
    },
    'خدمات_رستوران_و_فروشگاه': {
        fields: [
        {
            name: 'workExperience',
            type: 'list',
            input: 'list',
            list: [0, 1, 2, 3, ['&#8734;', 1000]],
            caption: ['سابقه کاری', '', 'rent'],
        }, 
        {
            name: 'education',
            type: 'list',
            input: 'list',
            list: [['دیپلم', 'diploma'], ['کارشناسی', 'bachelor'], ['کارشناسی ارشد', 'masters'], ['دکترا', 'PhD'], ['پزشکی', 'Dr'], ['دندان پزشکی', 'dentist']],
            caption: ['مدرک', '', 'rent'],
        }, 
        ],
    },
    'آموزش': {
        fields: [
        {
            name: 'workExperience',
            type: 'list',
            input: 'list',
            list: [0, 1, 2, 3, ['&#8734;', 1000]],
            caption: ['سابقه کاری', '', 'rent'],
        }, 
        {
            name: 'education',
            type: 'list',
            input: 'list',
            list: [['دیپلم', 'diploma'], ['کارشناسی', 'bachelor'], ['کارشناسی ارشد', 'masters'], ['دکترا', 'PhD'], ['پزشکی', 'Dr'], ['دندان پزشکی', 'dentist']],
            caption: ['مدرک', '', 'rent'],
        }, 
        ],
    },
    'رسانه_و_ماركتینگ_و_گرافیست': {
        fields: [
        {
            name: 'workExperience',
            type: 'list',
            input: 'list',
            list: [0, 1, 2, 3, ['&#8734;', 1000]],
            caption: ['سابقه کاری', '', 'rent'],
        }, 
        {
            name: 'education',
            type: 'list',
            input: 'list',
            list: [['دیپلم', 'diploma'], ['کارشناسی', 'bachelor'], ['کارشناسی ارشد', 'masters'], ['دکترا', 'PhD'], ['پزشکی', 'Dr'], ['دندان پزشکی', 'dentist']],
            caption: ['مدرک', '', 'rent'],
        }, 
        ],
    },
    'حسابداری_مالی_حقوقی': {
        fields: [
        {
            name: 'workExperience',
            type: 'list',
            input: 'list',
            list: [0, 1, 2, 3, ['&#8734;', 1000]],
            caption: ['سابقه کاری', '', 'rent'],
        }, 
        {
            name: 'education',
            type: 'list',
            input: 'list',
            list: [['دیپلم', 'diploma'], ['کارشناسی', 'bachelor'], ['کارشناسی ارشد', 'masters'], ['دکترا', 'PhD'], ['پزشکی', 'Dr'], ['دندان پزشکی', 'dentist']],
            caption: ['مدرک', '', 'rent'],
        }, 
        ],
    },
    'رسانه_و_ماركتینگ_و_گرافیست': {
        fields: [
        {
            name: 'workExperience',
            type: 'list',
            input: 'list',
            list: [0, 1, 2, 3, ['&#8734;', 1000]],
            caption: ['سابقه کاری', '', 'rent'],
        }, 
        {
            name: 'education',
            type: 'list',
            input: 'list',
            list: [['دیپلم', 'diploma'], ['کارشناسی', 'bachelor'], ['کارشناسی ارشد', 'masters'], ['دکترا', 'PhD'], ['پزشکی', 'Dr'], ['دندان پزشکی', 'dentist']],
            caption: ['مدرک', '', 'rent'],
        }, 
        ],
    },
    'بازاریابی_و_فروش': {
        fields: [
        {
            name: 'workExperience',
            type: 'list',
            input: 'list',
            list: [0, 1, 2, 3, ['&#8734;', 1000]],
            caption: ['سابقه کاری', '', 'rent'],
        }, 
        {
            name: 'education',
            type: 'list',
            input: 'list',
            list: [['دیپلم', 'diploma'], ['کارشناسی', 'bachelor'], ['کارشناسی ارشد', 'masters'], ['دکترا', 'PhD'], ['پزشکی', 'Dr'], ['دندان پزشکی', 'dentist']],
            caption: ['مدرک', '', 'rent'],
        }, 
        ],
    },
    'درمانی_زیبایی_و_بهداشتی': {
        fields: [
        {
            name: 'workExperience',
            type: 'list',
            input: 'list',
            list: [0, 1, 2, 3, ['&#8734;', 1000]],
            caption: ['سابقه کاری', '', 'rent'],
        }, 
        {
            name: 'education',
            type: 'list',
            input: 'list',
            list: [['دیپلم', 'diploma'], ['کارشناسی', 'bachelor'], ['کارشناسی ارشد', 'masters'], ['دکترا', 'PhD'], ['پزشکی', 'Dr'], ['دندان پزشکی', 'dentist']],
            caption: ['مدرک', '', 'rent'],
        }, 
        ],
    },
    'رایانه_و_IT': {
        fields: [
        {
            name: 'workExperience',
            type: 'list',
            input: 'list',
            list: [0, 1, 2, 3, ['&#8734;', 1000]],
            caption: ['سابقه کاری', '', 'rent'],
        }, 
        {
            name: 'education',
            type: 'list',
            input: 'list',
            list: [['دیپلم', 'diploma'], ['کارشناسی', 'bachelor'], ['کارشناسی ارشد', 'masters'], ['دکترا', 'PhD'], ['پزشکی', 'Dr'], ['دندان پزشکی', 'dentist']],
            caption: ['مدرک', '', 'rent'],
        }, 
        ],
    },
    'حمل_و_نقل': {
        fields: [
        {
            name: 'workExperience',
            type: 'list',
            input: 'list',
            list: [0, 1, 2, 3, ['&#8734;', 1000]],
            caption: ['سابقه کاری', '', 'rent'],
        }, 
        {
            name: 'education',
            type: 'list',
            input: 'list',
            list: [['دیپلم', 'diploma'], ['کارشناسی', 'bachelor'], ['کارشناسی ارشد', 'masters'], ['دکترا', 'PhD'], ['پزشکی', 'Dr'], ['دندان پزشکی', 'dentist']],
            caption: ['مدرک', '', 'rent'],
        }, 
        ],
    },
    'صنعت_و_مهندسی': {
        fields: [
        {
            name: 'workExperience',
            type: 'list',
            input: 'list',
            list: [0, 1, 2, 3, ['&#8734;', 1000]],
            caption: ['سابقه کاری', '', 'rent'],
        }, 
        {
            name: 'education',
            type: 'list',
            input: 'list',
            list: [['دیپلم', 'diploma'], ['کارشناسی', 'bachelor'], ['کارشناسی ارشد', 'masters'], ['دکترا', 'PhD'], ['پزشکی', 'Dr'], ['دندان پزشکی', 'dentist']],
            caption: ['مدرک', '', 'rent'],
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
            from: ['از ', '', 'from'],
            to: ['تا ', '', 'to'],
            caption: ['قیمت (لیر)', '', 'rent'],
        }, ],
    },
    'لوازم_آشپزخونه': {
        fields: [{
            name: 'price',
            type: 'range',
            input: 'int',
            from: ['از ', '', 'from'],
            to: ['تا ', '', 'to'],
            caption: ['قیمت (لیر)', '', 'rent'],
        }, ],
    },
    'دكوری_و_روشنایی': {
        fields: [{
            name: 'price',
            type: 'range',
            input: 'int',
            from: ['از ', '', 'from'],
            to: ['تا ', '', 'to'],
            caption: ['قیمت (لیر)', '', 'rent'],
        }, ],
    },
    'فرش_و_گلیم_و_قالیچه': {
        fields: [{
            name: 'price',
            type: 'range',
            input: 'int',
            from: ['از ', '', 'from'],
            to: ['تا ', '', 'to'],
            caption: ['قیمت (لیر)', '', 'rent'],
        }, ],
    },
    'باغچه_و_حیاط': {
        fields: [{
            name: 'price',
            type: 'range',
            input: 'int',
            from: ['از ', '', 'from'],
            to: ['تا ', '', 'to'],
            caption: ['قیمت (لیر)', '', 'rent'],
        }, ],
    },
    'سایر_وسایل': {
        fields: [{
            name: 'price',
            type: 'range',
            input: 'int',
            from: ['از ', '', 'from'],
            to: ['تا ', '', 'to'],
            caption: ['قیمت (لیر)', '', 'rent'],
        }, ],
    },
}

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
            janelaPopUp.abre("id", 'p orange alert', 'خطا', 'شهر انتخاب شده مجاز نیست!');
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
    console.log(data);
    $(this).html(`<i class="material-icons">hourglass_empty</i>`);
    strapi.advertise.create(data).then((buff) => {
        strapi.advertise.image.upload($(this).parent().find('#file')[0], buff.id).then(res => {
            janelaPopUp.abre("id", 'p green alert', 'انجام شد', 'آگهی با موفقیت ثبت شد!');
            $(this).html(`ثبت آگهی`);
            setTimeout(function() {
                window.location = '/';
            }, 1800);
        }).catch(e => {
            console.log(e);
            janelaPopUp.abre("id", 'p orange alert', 'خطا', 'مشکل در آپلود عکس ها!');
            $(this).html(`ثبت آگهی`);
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
        $('.closev').trigger('click');
    }).catch(e => {
        // console.log(e);
        janelaPopUp.abre("id", 'p orange alert', 'خطا', 'برای ثبت آگهی ابتدا باید وارد شوید!');
        $(this).html(`ثبت آگهی`);
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
    let self = this;
    $(this).parent().parent().parent().find('.panel-body').html('');
    $(this).parent().parent().parent().find('.panel-body').append(`
        <input type="hidden" id="class" value="${name}">
        <div class="field">
            <div class="title">شهر</div>
            <div class="select col-md-5">
                <span class="placeholder">انتخاب شهر</span>
                <ul>
                    <li data-value="آنكارا">آنكارا </li>
                    <li data-value="0">استانبول <span class='syel'>(به زودی)</span></li>
                    <li data-value="0">آنتالیا <span class='syel'>(به زودی)</span></li>
                    <li data-value="0">دنیزلی <span class='syel'>(به زودی)</span></li>
                    <li data-value="0">تورونتو  <span class='syel'>(به زودی)</span></li>
                    <li data-value="0">دوبی   <span class='syel'>(به زودی)</span></li>
                    <li data-value="0">لندن  <span class='syel'>(به زودی)</span></li>
                    <li data-value="0">ونكوور  <span class='syel'>(به زودی)</span></li>
                    <li data-value="0">منچستر  <span class='syel'>(به زودی)</span></li>
                    <li data-value="0">نیوكاسل  <span class='syel'>(به زودی)</span></li>
                    <li data-value="0">لیورپول  <span class='syel'>(به زودی)</span></li>
                    <li data-value="0">ناتینگها  <span class='syel'>(به زودی)</span></li>
                    <li data-value="0">سیدنی  <span class='syel'>(به زودی)</span></li>
                    <li data-value="0">ملبورن   <span class='syel'>(به زودی)</span></li>
                    <li data-value="0">تفلیس  <span class='syel'>(به زودی)</span></li>
                </ul>
                <input type="hidden" required id="city" />
            </div>
            <div class="clear"></div>
        </div>
        <div class="field">
            <div class="title">عکس آگهی</div>
            <div class="info">افزودنِ عکس بازدید آگهی شما را تا سه برابر افزایش می‌دهد. عکس هارا به صورت یکجا انتخاب کنید.</div>
            <p class="file">
                <label for="file" id="upl">افزودن عکس <i class="material-icons">add</i></label>
                <input id="file" type="file" multiple>
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
                        <div class="title">${field.caption[lang]}</div>
                        <input type="text" ${cc} id="${field.name}" required placeholder="...">
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
            <div class="info">شماره موبایل معتبری وارد کنید تا کاربران بتوانند با شما ارتباط برقرار کنند.</div>
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
        <button class="register-vip" id="submit">ثبت آگهی ویژه</button>
        <button class="register-vit" id="submit">ثبت و نمایش در ویترین</button>
        <div class="clear"></div>
        <div class="tovip">
            <p>برای ویژه کردن آگهی باید مبلغ 2500 لیر بپردازید, از لینک زیر وارد درگاه پرداخت خواهید شد :</p>
            <button class="vipit">پرداخت</button>
            <div class="clear"></div>
        </div>
        <div class="tovit">
            <p>یکی از پکیج های زیر را برای نمایش در ویترین انتخاب کنید : </p>
            <label class="form-radiolabel col-md-12">
                <input type="radio" class="form-radio" checked required="" name="type" value="3">
                <span class="form-radio-styler" aria-hidden="true"></span><span class="vpl">سه روزه (100 لیر)</span>
            </label>
            <label class="form-radiolabel col-md-12">
                <input type="radio" class="form-radio" required="" name="type" value="5">
                <span class="form-radio-styler" aria-hidden="true"></span><span class="vpl">پنج روزه (400 لیر)</span>
            </label>
            <label class="form-radiolabel col-md-12">
                <input type="radio" class="form-radio" required="" name="type" value="7">
                <span class="form-radio-styler" aria-hidden="true"></span><span class="vpl"> یک هفته (500 لیر)</span>
            </label>
            <button class="vitit">پرداخت</button>
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
          formatCurrency($(this), "blur");
        }
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
    if ($($('.dropdown-item.dropdown-selected').find('*')[3]).html() != undefined) {
        cat = $($('.dropdown-item.dropdown-selected').find('*')[3]).html().trim().split('،').join('').split(' ').join('_').split('__').join('_');
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
        janelaPopUp.abre("id", 'p orange alert', 'خطا', 'شهر انتخاب شده مجاز نیست!');
        return false;
    }
    let name = null
    if ($($('.dropdown-item.dropdown-selected').find('*')[3]).html() != undefined) {
        name = $($('.dropdown-item.dropdown-selected').find('*')[3]).html().trim().split('،').join('').split(' ').join('_').split('__').join('_');
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
                                <div class="title">${field.caption[lang]}</div>
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
        }
        $('.adv').html(``);
        $('#adv .search').html(`<i class="material-icons">hourglass_empty</i>`);
        if (results.length) {
            if (map[cat] != undefined || cat != null) {
                $(".fsi").fadeIn(100);
                $('.attrs').slideDown(100);
            } else {
                $(".fsi").fadeOut(100);
            }
            // $('.features').fadeOut(100);
            $('.adv').html(`
                <div class="cross-line rsa">
                    <span>نتایج جستوجوی آگهی</span>
                </div>
            `)
            results.forEach(function(ad) {
                fads[ad.id] = ad;
                data = ad;
                $('.adv').append(`
                    <div class="col-md-4 col-sm-6 col-xs-12 fr">
                        <div class="blog-card${(ad.vip) ? ' vip' : ''}">
                            <div class="meta">
                                <a data-id='${ad.id}' class="photo view" style="background-image: url(${(ad.images.length ? ad.images[0].url : '/uploads/def.jpg')})"></a>
                            </div>
                            <div class="description">
                                <h1>${data.title}</h1>
                                <h2>${timeSince(new Date(data.created_at).getTime())}</h2>
                                <h2><span class='ct'>دسته بندی </span> : ${data.class.split('_').join(' ')}</h2>
                                <p class="read-more">
                                    <a data-id='${ad.id}'class="view" href="#">مشاهده</a>
                                    ${(ad.vip) ? `<p data-id='${ad.id}'class="vip">ویژه</p>` : ''}
                                </p>
                            </div>
                        </div>
                    </div>
                `)
            });
            $([document.documentElement, document.body]).animate({
                scrollTop: $(".cross-line").offset().top - 100
            }, 600);
            $('#adv .search').html(`جستوجو...`);
        } else {
            $(".fsi").fadeOut(100);
            $('#adv .search').html(`جستوجو...`);
            $('.attrs').slideUp(100);
            janelaPopUp.abre("id", 'p blue alert', 'خطا', 'نتیجه ای یافت نشد!');
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
    if (user == null) {
        janelaPopUp.abre("id", 'p orange alert', 'خطا', 'برای ثبت آگهی ابتدا باید وارد شوید!');
        $(this).html(`ثبت آگهی`);
        return false;
    }
    e.preventDefault();
    $('.addv').fadeIn(300);
    $('html').css('overflow-y', 'hidden');
});

$('.closev').click(function(e) {
    e.preventDefault();
    $('.addv').fadeOut(300);
    $('html').css('overflow-y', 'scroll');
});

$('body').on('click', '.view', async function(e) {
    $('.cp').html('کپی');
    e.preventDefault();
    $('.advl .mark').html('نشان کردن');
    $('.advl .mark').attr('data-type', 'mark');
    $('html').css('overflow-y', 'hidden');
    console.log(strapi.advertise);
    let ad = await strapi.advertise.findOne($(this).attr('data-id'));
    let data = ad;
    if (user != null) {
        if (user.marks.map(ad => ad.id).includes(ad.id)) {
            $('.advl .mark').html('نشان شده');
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
    for (let t in map.dic) {
        // console.log(t, ' : ', data[t]);
        if (data[t] != undefined) {
            if (['price', 'rent', 'deposits'].includes(t)) {
                data[t] = parseInt(data[t]).format() + ' ₺';
            }
            if (t == 'class') {
                data[t] = data[t].split('_').join(' ');
            }
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

$('.message a').click(function() {
    $('form').animate({
        height: "toggle",
        opacity: "toggle"
    }, "slow");
});

$('.soon').click(function(e) {
    janelaPopUp.abre("id", 'p purple alert', 'به زودی', 'به زودی این بخش راه اندازی خواهد شد!');
});

$('.cp').click(function() {
    $('.cp').html('کپی شد')
    copyToClipboard($(".tp").get(0));
});

// jQuery(document).trigger("enhance");

const wrapper = document.getElementsByClassName('wrapper');
const button = document.getElementById('click');
const button2 = document.getElementById('click2');

button.addEventListener('click', clicked);
button2.addEventListener('click', clicked2);
let scroll = 0;

wrapper[0].addEventListener("scroll", function (event) {
  scroll = wrapper[0].scrollLeft;
});

function clicked () {
  // scroll = scroll += ($('.wrapper').get(0).scrollWidth - $('.wrapper').width()) / 5;
  scroll = scroll += 250 / 2;
  wrapper[0].scrollTo({
    left: scroll,
    behavior: 'smooth'
  });
  scroll = wrapper[0].scrollLeft + 50;
}

function clicked2 () {
  scroll = scroll -= 250 / 2;
  wrapper[0].scrollTo({
    left: scroll, 
    behavior: 'smooth' 
  });
  scroll = wrapper[0].scrollLeft + 50;
}

$('.gci').click(function() {
    $('.uinf').slideDown(300);
});

$('.logout').click(function() {
    user = null;
    document.cookie = 'jwt=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    strapi.jwt = null;
    window.location = '/';
});

$('.mark').click(function() {
    let addid = $(this).attr('data-addid');
    let t = $(this).attr('data-type');
    if (user != null) {
        if (t == 'mark') {
            strapi.advertise.mark(addid).then(function(e) {
                $('.advl .mark').html('نشان  شده');
                $('.advl .mark').attr('data-type', 'marked');
            });
        } else {
            strapi.advertise.unmark(addid).then(function(e) {
                $('.advl .mark').html('نشان کردن');
                $('.advl .mark').attr('data-type', 'mark');
            });
        }
    } else {
        janelaPopUp.abre("id", 'p orange alert', 'خطا', 'برای نشان کردن آگهی ابتدا باید وارد شوید!');
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
})

$('.wrapper').stop().animate({scrollLeft:0}, 800, 'swing', function() { 
});
function vits() {
    let sw = $('.wrapper').get(0).scrollWidth;
    let sp = $('.wrapper').scrollLeft();
    if (Math.abs(($('.wrapper').get(0).scrollWidth - $('.wrapper').width()) - $('.wrapper').scrollLeft()) < 10) {
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

vits();

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
