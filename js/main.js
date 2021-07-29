$(function () {
  $(document).mouseup(function (e) {
    var div = $(".menu_ul, .lines");
    if (!div.is(e.target) && div.has(e.target).length === 0) {
      $(".menu_ul").removeClass("active");
      document.getElementById("menu-bar").checked = false;
      document.getElementById("menu-active").checked = false;
    }
  });

  $(document).mouseup(function (e) {
    var div = $(".city_list");
    if (!div.is(e.target) && div.has(e.target).length === 0) {
      $(".city_list").hide();
    }
  });

  $(".lines").on("click", function () {
    if (
      document.getElementById("menu-bar").checked ||
      document.getElementById("menu-active").checked
    ) {
      $(".menu_ul").removeClass("active");
    } else {
      $(".menu_ul").addClass("active");
    }
  });

  $(".close_sale").click(function () {
    $(".topest").slideUp(500);
  });

  /* ************** calculator select ******************* */
  $("select").each(function () {
    var $this = $(this),
      numberOfOptions = $(this).children("option").length;
    $this.addClass("select-hidden");
    $this.wrap('<div class="select"></div>');
    $this.after('<div class="select-styled"></div>');
    var $styledSelect = $this.next("div.select-styled");
    $styledSelect.text($this.children("option").eq(0).text());
    var $list = $("<ul />", {
      class: "select-options",
    }).insertAfter($styledSelect);
    for (var i = 0; i < numberOfOptions; i++) {
      $("<li />", {
        text: $this.children("option").eq(i).text(),
        rel: $this.children("option").eq(i).val(),
      }).appendTo($list);
    }
    var $listItems = $list.children("li");
    $styledSelect.click(function (e) {
      e.stopPropagation();
      $("div.select-styled.active")
        .not(this)
        .each(function () {
          $(this).removeClass("active").next("ul.select-options").hide();
        });
      $(this).toggleClass("active").next("ul.select-options").toggle();
    });
    $listItems.click(function (e) {
      e.stopPropagation();
      $styledSelect.text($(this).text()).removeClass("active");
      $this.val($(this).attr("rel"));
      $list.hide();
    });
    $(document).click(function () {
      $styledSelect.removeClass("active");
      $list.hide();
    });
  });

  /* ************** calculator select ******************* */

  let link = $(".footer__menu a, .menu li a");
  link.on("click", function (e) {
    e.preventDefault();
    let selector = $(this).addClass("active").attr("href");
    let target = $(selector);
    $("html, body").animate({ scrollTop: target.offset().top - 120 }, 1000);
  });

  transliterate = (function () {
    var rus =
        "щ   ш  ч  ц  ю  я  ё  ж  ъ  ы  э  а б в г д е з и й к л м н о п р с т у ф х ь".split(
          / +/g
        ),
      eng =
        "shh sh ch cz yu ya yo zh `` y' e` a b v g d e z i j k l m n o p r s t u f x `".split(
          / +/g
        );
    return function (text, engToRus) {
      var x;
      for (x = 0; x < rus.length; x++) {
        text = text
          .split(engToRus ? eng[x] : rus[x])
          .join(engToRus ? rus[x] : eng[x]);
        text = text
          .split(engToRus ? eng[x].toUpperCase() : rus[x].toUpperCase())
          .join(engToRus ? rus[x].toUpperCase() : eng[x].toUpperCase());
      }
      return text;
    };
  })();

  $.getJSON("https://json.geoiplookup.io", function (data) {
    $(".city").text(`${transliterate(transliterate(data.region), true)}`);
  });

  let city = document.querySelectorAll(".city_list li");
  for (let i = 0; i < city.length; ++i) {
    city[i].addEventListener("click", function () {
      let cityName = city[i].innerHTML;
      $(".city").html(cityName);
      $(".city_list").hide();
    });
  }

  $(".city_title").click(function () {
    $(".city_list").css("display", "flex");
  });

  document.querySelector(".btn-back").addEventListener("click", function () {
    location.reload();
  });

  var swiper = new Swiper(".reviewSwiper", {
    spaceBetween: 60,
    navigation: {
      nextEl: ".review-button-next",
      prevEl: ".review-button-prev",
    },
    breakpoints: {
      0: {
        slidesPerView: 1,
        slidesPerGroup: 1,
      },
      992: {
        slidesPerView: 1.6,
        slidesPerGroup: 1,
      },
    },
  });

  let prices = [];
  let electricPrices = [];
  let mechanicPrices = [];
  let priceText = document.querySelectorAll(".amount");
  for (let i = 0; i < priceText.length; i++) {
    let oldprice = priceText[i].innerText;
    let newprice = oldprice.replace(/[^0-9\.]/g, "");
    prices.push(newprice);
  }

  for (let i = 0; i < prices.length; i++) {
    if (i < 8) {
      electricPrices.push(prices[i]);
    } else {
      mechanicPrices.push(prices[i]);
    }
  }

  $(function () {
    $("#slider-range").slider({
      range: true,
      min: 0,
      max: 170000,
      values: [0, 170000],
      change: function (event, ui) {
        if ($(".electrical").hasClass("active")) {
          $(".electric").fadeOut();
          for (let i = 0; i < electricPrices.length; i++) {
            if (
              electricPrices[i] > ui.values[0] &&
              electricPrices[i] < ui.values[1]
            ) {
              $(electricGoods[i]).fadeIn();
            }
          }
        } else {
          $(".mechanic").fadeOut();
          for (let i = 0; i < mechanicPrices.length; i++) {
            if (
              mechanicPrices[i] > ui.values[0] &&
              mechanicPrices[i] < ui.values[1]
            ) {
              $(mechanicGoods[i]).fadeIn();
            }
          }
        }
      },
      slide: function (event, ui) {
        $(".start").text(ui.values[0]);
        $(".end").text(ui.values[1]);
      },
    });
  });

  let basket = document.querySelectorAll(".basket");
  let name = document.querySelectorAll(".good_name");
  let title = document.querySelector(".goodForm .title");

  for (let i = 0; i < basket.length; i++) {
    basket[i].addEventListener("click", function () {
      title.innerText = "";
      title.innerText = name[i].innerText;
      $("#good").val(name[i].innerText);
    });
  }

  const goods = [
    {
      name: "РПРО-11",
      price: "79 990₽",
      description: `<p class="text">Мультифункциональная медицинская кровать РПРО-11 на электроприводе. Секции регулируются по углу наклона, что важно для комфорта пациента и профилактики пролежней. Пультовое управление значительно облегчает ежедневные задачи в уходе за человеком и экономит время.<br>
      <span>+</span> Габариты кровати: 2090х960 мм<br>
      <span>+</span> Максимальный вес: до 180 кг
      </p>`,
      functions: `<p class="text"><span>+</span> подъем спинной секции<br>
      <span>+</span> подъем и опускание ножной секции<br>
      <span>+</span> встроенный электро	туалет с регулировкой извлечения <br>
      <span>+</span> боковое переворачивание <br>
      <span>+</span> возможность легкого вставания и выхода
      </p>`,
      baseEquipment: `<p class="text"><span>+</span>  каркас кровати<br>
      <span>+</span> боковые складные ограждения <br>
      <span>+</span> штанга для подтягивания<br>
      <span>+</span> стойка для капельницы<br>
      <span>+</span> колеса с индивидуальными тормозами 
      </p>`,
      additional: `<p class="text"></p>`,
      img: [
        `images/electric/rpro11/4.jpg`,
        `images/electric/rpro11/2.jpg`,
        `images/electric/rpro11/3.jpg`,
        `images/electric/rpro11/1.jpg`,
      ],
    },
    {
      name: "РПРО-06",
      price: "55 990₽",
      description: `<p class="text">Кровать с расширенным функционалом РПРО-06 для комфортного ухода за лежачим больным. Она значительно упростит реабилитацию и лечение, предупреждая отеки и снимая напряжение мышц.<br>
      <span>+</span> Габариты кровати: 1980х900 мм<br>
      <span>+</span> Максимальный вес: до 180 кг
      </p>`,
      functions: `<p class="text"><span>+</span> подъем спинной секции<br>
      <span>+</span> подъем и опускание ножной секции<br>
      <span>+</span> встроенный туалет с регулировкой извлечения 
      </p>`,
      baseEquipment: `<p class="text"><span>+</span>  каркас кровати<br>
      <span>+</span> боковые складные ограждения <br>
      <span>+</span> штанга для подтягивания<br>
      <span>+</span> стойка для капельницы
      </p>`,
      additional: `<p class="text"></p>`,
      img: [
        `images/electric/rpro06/4.jpg`,
        `images/electric/rpro06/2.jpg`,
        `images/electric/rpro06/3.jpg`,
        `images/electric/rpro06/1.jpg`,
      ],
    },
    {
      name: "РПРО-13",
      price: "101 990₽",
      description: `<p class="text">Медицинская кровать РПРО-13–мультифункциональная модель на пульте управления. В разы облегчает уход за лежачим больным в домашних условиях. Все секции легко регулируются по углу наклона — пациента можно зафиксировать в любом положении для обеспечения комфорта, профилактики кардиозаболеваний и прол	ежней.<br>
      <span>+</span> Габариты кровати: 1920х900 мм<br>
      <span>+</span> Максимальный вес: до 200 кг
      </p>`,
      functions: `<p class="text"><span>+</span> подъем спинной секции<br>
      <span>+</span> подъем и опускание ножной секции<br>
      <span>+</span> встроенный туалет с регулировкой извлечения <br>
      <span>+</span> боковое переворачивание с таймером <br>
      <span>+</span> регулировка по высоте <br>
      <span>+</span> возможность легкого вставания и выхода 
      </p>`,
      baseEquipment: `<p class="text"><span>+</span>  каркас кровати<br>
      <span>+</span> боковые складные ограждения<br>
      <span>+</span> штанга для подтягивания<br>
      <span>+</span> стойка для капельницы<br>
      <span>+</span> колеса с индивидуальными тормозами 
      </p>`,
      additional: `<p class="text"></p>`,
      img: [
        `images/electric/rpro13/4.jpg`,
        `images/electric/rpro13/2.jpg`,
        `images/electric/rpro13/3.jpg`,
        `images/electric/rpro13/1.jpg`,
      ],
    },
    {
      name: "РПРО-11 XL",
      price: "79 990₽",
      description: `<p class="text">Модель с широким функционалом и увеличенным ложем для большего комфорта. Легко трансформируется в кресло и переворачивает больного на бок – управление кроватью осуществляется с помощью пульта.<br>
      <span>+</span> Габариты кровати: 2090х1090 мм<br>
      <span>+</span> Максимальный вес: до 180 кг
      </p>`,
      functions: `<p class="text"><span>+</span> подъем спинной секции<br>
      <span>+</span> подъем и опускание ножной секции<br>
      <span>+</span> встроенный электротуалет с регулировкой извлечения <br>
      <span>+</span> боковое переворачивание <br>
      <span>+</span> возможность легкого вставания и выхода 
      </p>`,
      baseEquipment: `<p class="text"><span>+</span>  каркас кровати<br>
      <span>+</span> боковые складные ограждения <br>
      <span>+</span> штанга для подтягивания<br>
      <span>+</span> стойка для капельницы<br>
      <span>+</span> колеса с индивидуальными тормозами 
      </p>`,
      additional: `<p class="text"></p>`,
      img: [
        `images/electric/rpro11xl/4.jpg`,
        `images/electric/rpro11xl/2.jpg`,
        `images/electric/rpro11xl/3.jpg`,
        `images/electric/rpro11xl/1.jpg`,
      ],
    },
    {
      name: "РПРО-07",
      price: "77 490₽",
      description: `<p class="text">Электрическая многофункциональная кровать РПРО-07 поможет в несколько раз облегчить уход за тяжелобольными! С помощью пульта управления без усилий меняется положение больного для предупреждения застоя в тканях.<br>
      <span>+</span> Габариты кровати: 2050х950 мм<br>
      <span>+</span> Максимальный вес: до 180 кг
      </p>`,
      functions: `<p class="text"><span>+</span> подъем спинной секции<br>
      <span>+</span> подъем и опускание ножной секции<br>
      <span>+</span> встроенный туалет с регулировкой извлечения <br>
      <span>+</span> возможность легкого вставания и выхода 
      </p>`,
      baseEquipment: `<p class="text"><span>+</span>  каркас кровати<br>
      <span>+</span> боковые складные ограждения <br>
      <span>+</span> штанга для подтягивания<br>
      <span>+</span> стойка для капельницы
      </p>`,
      additional: `<p class="text"></p>`,
      img: [
        `images/electric/rpro07/4.jpg`,
        `images/electric/rpro07/2.jpg`,
        `images/electric/rpro07/3.jpg`,
        `images/electric/rpro07/1.jpg`,
      ],
    },
    {
      name: "РПРО-17",
      price: "160 990₽",
      description: `<p class="text">Кровать РПРО-17 значительно упростит реабилитацию и лечение, поддерживая комфортное для больного положение. Уникальная особенность модели — вертикализатор. Она позволяет перевести больного в вертикальное положение и подготовить к ходьбе. Широкие ремни с липучками обеспечивают комфортную и надежную фиксацию человека при наклоне.<br>
      <span>+</span> Габариты кровати: 2150х1100 мм<br>
      <span>+</span> Максимальный вес: до 150 кг
      </p>`,
      functions: `<p class="text"><span>+</span> подъем спинной секции<br>
      <span>+</span> подъем и опускание ножной секции<br>
      <span>+</span> боковое переворачивание с таймером <br>
      <span>+</span> вертикализация <br>
      <span>+</span> встроенный туалет с регулировкой извлечения 
      </p>`,
      baseEquipment: `<p class="text"><span>+</span>  каркас кровати<br>
      <span>+</span> боковые складные ограждения <br>
      <span>+</span> штанга для подтягивания<br>
      <span>+</span> столик для приема пищи <br>
      <span>+</span> колеса с  индивидуальными тормозами 
      </p>`,
      additional: `<p class="text"></p>`,
      img: [
        `images/electric/rpro17/4.jpg`,
        `images/electric/rpro17/2.jpg`,
        `images/electric/rpro17/3.jpg`,
        `images/electric/rpro17/1.jpg`,
      ],
    },
    {
      name: "РПРО-14",
      price: "71 490₽",
      description: `<p class="text">Модель РПРО-14 обладает независимыми регулировками секций, уникальная особенность кровати – регулировка по высоте с разными углами наклона. Эта функция максимально полезна для нормализации кровообращения, для удобства проведения массажных или оздоровительных реабилитационных сеансов.<br>
      <span>+</span> Габариты кровати: 2170х1200 мм<br>
      <span>+</span> Максимальный вес: до 180 кг
      </p>`,
      functions: `<p class="text"><span>+</span> подъем спинной секции<br>
      <span>+</span> подъем и опускание ножной секции<br>
      <span>+</span> регулировка по высоте с высоким диапазоном опускания и подъёма 
      </p>`,
      baseEquipment: `<p class="text"><span>+</span>  каркас кровати<br>
      <span>+</span> боковые съемные ограждения <br>
      <span>+</span> штанга для подтягивания<br>
      <span>+</span> стойка для капельницы
      </p>`,
      additional: `<p class="text"></p>`,
      img: [
        `images/electric/rpro14/4.jpg`,
        `images/electric/rpro14/2.jpg`,
        `images/electric/rpro14/3.jpg`,
        `images/electric/rpro14/1.jpg`,
      ],
    },
    {
      name: "РПРО-15",
      price: "104 990₽",
      description: `<p class="text">Кровать предназначена для реабилитации больных или ослабленных после операции пациентов в домашних условиях. Многофункциональность модели обеспечивает комфортное положение человека и способствует нормальному функционированию жизненно-важных процессов.<br>
      <span>+</span> Габариты кровати: 2080х1090 мм<br>
      <span>+</span> Максимальный вес: до 200 кг
      </p>`,
      functions: `<p class="text"><span>+</span> подъем спинной секции<br>
      <span>+</span> подъем и опускание ножной секции<br>
      <span>+</span> боковое переворачивание с таймером <br>
      <span>+</span> встроенный туалет с регулировкой извлечения <br>
      <span>+</span> возможность легкого вставания и выхода 
      </p>`,
      baseEquipment: `<p class="text"><span>+</span>  каркас кровати<br>
      <span>+</span> штанга для подтягивания<br>
      <span>+</span> стойка для капельницы<br>
      <span>+</span> столик для приема пищи <br>
      <span>+</span> колеса с  индивидуальными тормозами<br>
      <span>+</span> боковые складные ограждения 
      </p>`,
      additional: `<p class="text"><span>+</span> стойка для капельницы<br>
      <span>+</span> штанга для подтягивания<br>
      <span>+</span> столик для приема пищи
      </p>`,
      img: [
        `images/electric/rpro15/4.jpg`,
        `images/electric/rpro15/2.jpg`,
        `images/electric/rpro15/3.jpg`,
        `images/electric/rpro15/1.jpg`,
      ],
    },
    {
      name: "КПС-12",
      price: "19 990₽",
      description: `<p class="text">Модель КПС-12 идеальна для ослабленных людей или реабилитационного периода после операции. Все функции позволяют сделать уход за тяжелобольным значительно более комфортным, переводя пациента в комфортное положение, предупреждая отеки и снимая напряжение с мышц<br>
      <span>+</span> Габариты кровати: 2100х960 м<br>
      <span>+</span> Максимальный вес: до 200 кг
      </p>`,
      functions: `<p class="text"><span>+</span>  подъем спинной секции</p>`,
      baseEquipment: `<p class="text"><span>+</span>  каркас кровати<br>
      <span>+</span> боковые ограждения
      </p>`,
      additional: `<p class="text"><span>+</span>  подъем ножной секции (+1500 руб)<br>
      <span>+</span> столик для приема пищи (+1500 руб)<br>
      <span>+</span> штанга для подтягивания (+1500 руб)<br>
      <span>+</span> колеса с индивидуальными тормозами (+1500 руб)
      </p>`,
      img: [
        `images/mechanic/kps12/4.jpg`,
        `images/mechanic/kps12/2.jpg`,
        `images/mechanic/kps12/3.jpg`,
        `images/mechanic/kps12/1.jpg`,
      ],
    },
    {
      name: "РПРО-03",
      price: "49 490₽",
      description: `<p class="text">Функциональная кровать РПРО-03 имеет один из наиболее богатых функционалов. Возможности кровати снизят физическую нагрузку при выполнении любых задач в 3 раза!<br>
      <span>+</span> Габариты кровати: 2090х960 мм<br>
      <span>+</span> Максимальный вес: до 180 кг      
      </p>`,
      functions: `<p class="text"><span>+</span> подъем спинной секции <br>
      <span>+</span> подъем и опускание ножной секции <br>
      <span>+</span> боковое переворачивание <br>
      <span>+</span> возможность легкого вставания и выхода <br>
      <span>+</span> встроенный туалет с регулировкой извлечения
      </p>`,
      baseEquipment: `<p class="text"><span>+</span>  каркас кровати<br>
      <span>+</span> боковые складные ограждения<br>
      <span>+</span> штанга для подтягивания<br>
      <span>+</span> стойка для капельницы<br>
      <span>+</span> столик для приема пищи<br>
      <span>+</span> колеса с индивидуальными тормозами      
      </p>`,
      additional: `<p class="text"></p>`,
      img: [
        `images/mechanic/rpro03/4.jpg`,
        `images/mechanic/rpro03/2.jpg`,
        `images/mechanic/rpro03/3.jpg`,
        `images/mechanic/rpro03/1.jpg`,
      ],
    },
    {
      name: "РПРО-01 Лайт",
      price: "39 990₽",
      description: `<p class="text">Функциональная кровать РПРО-01 Лайт — одна из самых бюджетных моделей медицинских кроватей, оснащенных кардио-креслом и туалетным устройством. Благодаря особенностям кровати можно легко изменять положение тела больного.<br>
      <span>+</span> Габариты кровати: 1980х900 мм<br>
      <span>+</span> Максимальный вес: до 200 кг
      </p>`,
      functions: `<p class="text"><span>+</span> подъем спинной секции<br>
      <span>+</span> подъем и опускание ножной секции<br>
      <span>+</span> возможность легкого вставания и выхода <br>
      <span>+</span> встроенный туалет с регулировкой извлечения
      </p>`,
      baseEquipment: `<p class="text"><span>+</span>  каркас кровати<br>
      <span>+</span> штанга для подтягивания<br>
      <span>+</span> боковые ограждения
      </p>`,
      additional: `<p class="text"><span>+</span>  быстросъемными креплениями для изголовья и изножья (+1000 руб)<br>
      <span>+</span> столик для приема пищи (+1500 руб)
      </p>`,
      img: [
        `images/mechanic/rpro01light/4.jpg`,
        `images/mechanic/rpro01light/2.jpg`,
        `images/mechanic/rpro01light/3.jpg`,
        `images/mechanic/rpro01light/1.jpg`,
      ],
    },
    {
      name: "РПРО-05",
      price: "47 490₽",
      description: `<p class="text">Многофункциональная кровать РПРО-05 на механическом приводе значительно облегчит ежедневные задачи по уходу за лежачим пациентом. Регулировка секций обеспечивает равномерную циркуляцию крови и не допускает застоя в тканях.<br>
      <span>+</span> Габариты кровати: 2090х960 мм<br>
      <span>+</span> Максимальный вес: до 180 кг
      </p>`,
      functions: `<p class="text"><span>+</span> подъем спинной секции <br>
      <span>+</span> подъем и опускание ножной секции<br>
      <span>+</span> боковое переворачивание <br>
      <span>+</span> встроенный туалет с регулировкой извлечения
      </p>`,
      baseEquipment: `<p class="text"><span>+</span>  каркас кровати<br>
      <span>+</span> боковые складные ограждения <br>
      <span>+</span> штанга для подтягивания<br>
      <span>+</span> стойка для капельницы<br>
      <span>+</span> колеса с индивидуальными тормозами
      </p>`,
      additional: `<p class="text"></p>`,
      img: [
        `images/mechanic/rpro05/4.jpg`,
        `images/mechanic/rpro05/2.jpg`,
        `images/mechanic/rpro05/3.jpg`,
        `images/mechanic/rpro05/1.jpg`,
      ],
    },
    {
      name: "РПРО-03 XL",
      price: "61 990₽",
      description: `<p class="text">Популярная механическая модель РПРО-03/XL с расширенным функционалом и увеличенным размером ложа для ухода за лежачими больными в домашних условиях. Идеально подходит для восстановления при переломе шейки бедра, параличе, онкологии, после инсульта или операции.<br>
      <span>+</span> Габариты кровати: 2090х1200 мм<br>
      <span>+</span> Максимальный вес: до 200 кг
      </p>`,
      functions: `<p class="text"><span>+</span> подъем спинной секции<br>
      <span>+</span> подъем и опускание ножной секции<br>
      <span>+</span> встроенный туалет с регулировкой извлечения <br>
      <span>+</span> боковое переворачивание <br>
      <span>+</span> возможность легкого вставания и выхода <br>
      <span>+</span> увеличенное ложе для удобства в размещении и уходе за пациентом
      </p>`,
      baseEquipment: `<p class="text"><span>+</span>  каркас кровати<br>
      <span>+</span> боковые складные ограждения <br>
      <span>+</span> штанга для подтягивания<br>
      <span>+</span> стойка для капельницы<br>
      <span>+</span> съемный столик для приема пищи<br>
      <span>+</span> колеса с индивидуальными тормозами
      </p>`,
      additional: `<p class="text"></p>`,
      img: [
        `images/mechanic/rpro03xl/4.jpg`,
        `images/mechanic/rpro03xl/2.jpg`,
        `images/mechanic/rpro03xl/3.jpg`,
        `images/mechanic/rpro03xl/1.jpg`,
      ],
    },
    {
      name: "РПРО-01",
      price: "41 990₽",
      description: `<p class="text">Функциональная кровать РПРО-01 спроектирована для облегчения ухода за лежачими больными. Механические приводы позволяют легко поднимать/опускать спину и ноги больного, придавать телу удобное положение для приема пищи и туалетных процедур, соблюдать профилактику застоя кровообращения и пролежней.<br>
      <span>+</span> Габариты кровати: 2090х960 мм<br>
      <span>+</span> Максимальный вес: до 200 кг
      </p>`,
      functions: `<p class="text"><span>+</span> подъем спинной секции<br>
      <span>+</span> подъем и опускание ножной секции<br>
      <span>+</span> встроенный туалет с регулировкой извлечения 
      </p>`,
      baseEquipment: `<p class="text"><span>+</span>  каркас кровати<br>
      <span>+</span> боковые складные ограждения <br>
      <span>+</span> штанга для подтягивания<br>
      <span>+</span> колеса с индивидуальными тормозами
      </p>`,
      additional: `<p class="text"><span>+</span>  столик для приема пищи (+1500 руб)</p>`,
      img: [
        `images/mechanic/rpro01/4.jpg`,
        `images/mechanic/rpro01/2.jpg`,
        `images/mechanic/rpro01/3.jpg`,
        `images/mechanic/rpro01/1.jpg`,
      ],
    },
    {
      name: "РПРО-02/Б",
      price: "34 990₽",
      description: `<p class="text">Модель этой серии легко трансформируется в кресло для профилактики сердечных заболеваний, приема пищи, чтения или просмотра ТВ, поддерживая стабильное, комфортное положение пациента.<br>
      <span>+</span> Габариты кровати: 2090х960 мм<br>
      <span>+</span> Максимальный вес: до 180 кг
      </p>`,
      functions: `<p class="text"><span>+</span> подъем спинной секции<br>
      <span>+</span> подъем ножной секции<br>
      <span>+</span> возможность легкого вставания и выхода 
      </p>`,
      baseEquipment: `<p class="text"><span>+</span>  каркас кровати<br>
      <span>+</span> боковые съемные ограждения 
      </p>`,
      additional: `<p class="text"><span>+</span>  столик для приема пищи (+1500 руб)</p>`,
      img: [
        `images/mechanic/rpro02b/4.jpg`,
        `images/mechanic/rpro02b/2.jpg`,
        `images/mechanic/rpro02b/3.jpg`,
        `images/mechanic/rpro02b/1.jpg`,
      ],
    },
    {
      name: "РПРО-20",
      price: "77 990₽",
      description: `<p class="text">Модель РПРО-20 идеально подойдет для ухода за тяжелобольными и лежачими пациентами в домашних условиях. Уникальная особенность модели — трансформация кровати в комфортное кресло-каталку для дома и улицы. К ней в комплекте идут вставные боковые ограждения.<br>
      <span>+</span> Габариты кровати: 2150х1090 мм<br>
      <span>+</span> Максимальный вес: до 180 кг
      </p>`,
      functions: `<p class="text"><span>+</span> подъем спинной секции<br>
      <span>+</span> подъем и опускание ножной секции<br>
      <span>+</span> интегрированное в каркас кровати кресло-каталка <br>
      <span>+</span> встроенный туалет с регулировкой извлечения <br>
      <span>+</span> возможность легкого вставания и выхода 
      </p>`,
      baseEquipment: `<p class="text"><span>+</span>  каркас кровати<br>
      <span>+</span> боковые складные ограждения с фиксацией в двух положениях <br>
      <span>+</span> вставные боковые ограждения для кресла-каталки<br>
      <span>+</span> штанга для подтягивания<br>
      <span>+</span> колеса с индивидуальными тормозами
      </p>`,
      additional: `<p class="text">Модель также представлена с электрическим приводом (+15000 руб)</p>`,
      img: [
        `images/mechanic/rpro20/4.jpg`,
        `images/mechanic/rpro20/2.jpg`,
        `images/mechanic/rpro20/3.jpg`,
        `images/mechanic/rpro20/1.jpg`,
      ],
    },
  ];

  let openCart = document.querySelectorAll(".openCart");
  let photos = document.querySelectorAll(".cartForm .gallery_block a");
  let cartTitle = document.querySelector(".cart_title");
  let price = document.querySelector(".form .price_block");
  let description = document.querySelector(".description");
  let functional = document.querySelector(".functional");
  let additional = document.querySelector(".additional");
  let baseEquipment = document.querySelector(".base");

  for (let i = 0; i < openCart.length; i++) {
    openCart[i].addEventListener("click", function () {
      cartTitle.innerText = "";
      photos.innerHTML = "";
      price.innerText = "";
      description.innerHTML = "";
      functional.innerHTML = "";
      additional.innerHTML = "";


      
      $(".cart_name").val(goods[i].name);
      cartTitle.innerText = goods[i].name;
      price.innerText = goods[i].price;
      description.innerHTML = `
      <p class="text_title">Описание модели</p>
      ${goods[i].description}`;
      functional.innerHTML = `
      <p class="text_title">Функциональность модели</p>
      ${goods[i].functions}`;
      additional.innerHTML = `
      <p class="text_title">${
        goods[i].additional !== '<p class="text"></p>' ? "Дополнительно" : ""
      }</p>
      ${goods[i].additional}`;
      baseEquipment.innerHTML = `
      <p class="text_title">Базовые комплектации</p>
      ${goods[i].baseEquipment}`;
      for (let u = 0; u < 4; u++) {
        $(photos[u]).attr("src", `${goods[i].img[u]}`);
        $(photos[u]).attr("href", `${goods[i].img[u]}`);
        photos[
          u
        ].innerHTML = `<img class="thumb" src="${goods[i].img[u]}" alt="" />`;
      }
    });
  }

  const electric = document.querySelectorAll(".electric");
  const mechanic = document.querySelectorAll(".mechanic");
  let electricGoods = [];
  let mechanicGoods = [];

  function goToMassive(target, box) {
    for (let i = 0; i < target.length; i++) {
      box.push(target[i]);
    }
  }
  goToMassive(electric, electricGoods);
  goToMassive(mechanic, mechanicGoods);

  $(".filter_tab").click(function () {
    $(".filter_tab")
      .removeClass("active")
      .eq($(this).index())
      .addClass("active");
    $(".filter_list .filter").prop("checked", false);
  });

  function toggleGoods(target, show, hide) {
    $(target).click(function () {
      $(hide).fadeOut();
      $(show).fadeIn();
    });
  }

  function inputChange(target, show) {
    $(target).on("change", function () {
      if ($(".electrical").hasClass("active")) {
        if ($(target).prop("checked")) {
          const needItems = [];
          for (let key in electricGoods) {
            $(electricGoods[key]).css("display") == "block"
              ? needItems.push(electricGoods[key])
              : null;
          }
          for (let i = 0; i < needItems.length; i++) {
            if (needItems[i].classList.contains(show)) {
              $(needItems[i]).fadeIn();
            } else {
              $(needItems[i]).fadeOut();
            }
          }
        } else {
          $(".electric").fadeIn();
        }
      } else {
        if ($(target).prop("checked")) {
          const needItems = [];
          for (let key in mechanicGoods) {
            $(mechanicGoods[key]).css("display") == "block"
              ? needItems.push(mechanicGoods[key])
              : null;
          }
          for (let i = 0; i < needItems.length; i++) {
            if (needItems[i].classList.contains(show)) {
              $(needItems[i]).fadeIn();
            } else {
              $(needItems[i]).fadeOut();
            }
          }
        } else {
          $(".mechanic").fadeIn();
        }
      }
    });
  }

  $(".catalog .select-options li").on("click", function () {
    if ($(".electrical").hasClass("active")) {
      if ($(this).index() == 1) {
        $(".electric").fadeOut();
        $(".electric.kapel").fadeIn();
      } else if ($(this).index() == 2) {
        $(".electric").fadeOut();
        $(".electric.stone").fadeIn();
      } else {
        $(".electric").fadeOut();
        $(".electric.foodTable").fadeIn();
      }
    } else {
      if ($(this).index() == 1) {
        $(".mechanic").fadeOut();
        $(".mechanic.kapel").fadeIn();
      } else if ($(this).index() == 2) {
        $(".mechanic").fadeOut();
        $(".mechanic.stone").fadeIn();
      } else {
        $(".mechanic").fadeOut();
        $(".mechanic.foodTable").fadeIn();
      }
    }
  });

  toggleGoods(".electrical", ".electric", ".mechanic");
  toggleGoods(".mechanical", ".mechanic", ".electric");
  inputChange("#checkbox1", "footTop");
  inputChange("#checkbox2", "footBottom");
  inputChange("#checkbox3", "side");
  inputChange("#checkbox4", "toilet");
});
