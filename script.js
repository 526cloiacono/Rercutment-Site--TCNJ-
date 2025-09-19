// Sticky Navigation (optional)
class StickyNavigation {
  constructor() {
    this.currentId = null;
    this.currentTab = null;
    this.tabContainerHeight = 70;
    let self = this;
    $('.et-hero-tab').click(function(event) {
      self.onTabClick(event, $(this));
    });
    $(window).scroll(() => { this.onScroll(); });
    $(window).resize(() => { this.onResize(); });
  }

  onTabClick(event, element) {
    event.preventDefault();
    let scrollTop = $(element.attr('href')).offset().top - this.tabContainerHeight + 1;
    $('html, body').animate({ scrollTop: scrollTop }, 600);
  }

  onScroll() {
    this.checkTabContainerPosition();
    this.findCurrentTabSelector();
  }

  onResize() {
    if (this.currentId) this.setSliderCss();
  }

  checkTabContainerPosition() {
    let offset = $('.et-hero-tabs').offset().top + $('.et-hero-tabs').height() - this.tabContainerHeight;
    if ($(window).scrollTop() > offset) {
      $('.et-hero-tabs-container').addClass('et-hero-tabs-container--top');
    } else {
      $('.et-hero-tabs-container').removeClass('et-hero-tabs-container--top');
    }
  }

  findCurrentTabSelector() {
    let newCurrentId, newCurrentTab;
    $('.et-hero-tab').each(function() {
      let id = $(this).attr('href');
      if (id.startsWith("#")) {
        let offsetTop = $(id).offset().top - 70;
        let offsetBottom = $(id).offset().top + $(id).height() - 70;
        if ($(window).scrollTop() > offsetTop && $(window).scrollTop() < offsetBottom) {
          newCurrentId = id;
          newCurrentTab = $(this);
        }
      }
    });
    if(this.currentId !== newCurrentId || this.currentId === null) {
      this.currentId = newCurrentId;
      this.currentTab = newCurrentTab;
      this.setSliderCss();
    }
  }

  setSliderCss() {
    if(this.currentTab) {
      $('.et-hero-tab-slider').css({
        width: this.currentTab.css('width'),
        left: this.currentTab.offset().left
      });
    }
  }
}
document.addEventListener("DOMContentLoaded", () => {
  const nav = document.querySelector(".et-hero-tabs-container");
  const heroHeight = document.querySelector(".et-hero-tabs").offsetHeight;

  window.addEventListener("scroll", () => {
    if (window.scrollY >= heroHeight - nav.offsetHeight) {
      nav.classList.add("sticky");
    } else {
      nav.classList.remove("sticky");
    }
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const alumni = [
    { name: "Paul Rudd", major: "Theater", photo: "img/paulrd.jpg", note: "Actor, Ant-Man" },
    { name: "Holly Black", major: "English", photo: "img/Holly Black.webp", note: "Author" },
    { name: "Jonas Chernick", major: "Film", photo: "img/JonasChernick.jpg", note: "Screenwriter & Actor" },
    { name: "Mr. Kilgore", major: "Web, Woodshop", photo: "img/JonasChernick.jpg", note: "Teacher" },
    { name: "Ms. Leonard", major: "Web, Comp-sci", photo: "img/JonasChernick.jpg", note: "Teacher" },
    { name: "Another Alum", major: "Film", photo: "img/JonasChernick.jpg", note: "Screenwriter & Actor" },
  ];

  function renderAlumni(list) {
    const grid = document.getElementById("alumniGrid");
    grid.className = "row"; // make container a Bootstrap row
    grid.innerHTML = "";

    list.forEach(alum => {
      // create a column for each card
      const col = document.createElement("div");
      col.className = "col-lg-4 col-md-6 col-sm-12 mb-4";

      // build the card
      col.innerHTML = `
        <div class="card h-100">
          <img src="${alum.photo}" class="card-img-top" alt="${alum.name}">
          <div class="card-body">
            <h3 class="card-title">${alum.name}</h3>
            <p class="major mb-1">${alum.major}</p>
            <p class="note text-muted">${alum.note}</p>
          </div>
        </div>
      `;

      grid.appendChild(col);
    });
  }

  renderAlumni(alumni);
});




// quote gen
var quotesArray = [
		'Founded in 1855, TCNJ was the first teacher-training school in New Jersey. — TCNJ Archives',
'The campus in Ewing is known for its Georgian-style architecture and scenic greenery. — Princeton Review',
'Author Holly Black, co-creator of The Spiderwick Chronicles, attended TCNJ. — Alumni Records',
'Indie rock band Real Estate was formed by students who met at TCNJ. — Pitchfork',
'Roscoe the Lion proudly represents the TCNJ Lions athletic teams. — Athletics Department',
'TCNJ is consistently ranked among the top public colleges in the U.S. for undergraduate teaching. — U.S. News',
'The school’s roots in education remain strong, with one of the best teaching programs in the state. — NJ Education Review',
'TCNJ’s library is named after Dr. Roscoe West, a former president of the college. — Campus History',
'Every spring, TCNJ hosts fun traditions like “Spirit Week” and community festivals. — Student Life',
'Despite being a public college, TCNJ has the feel of a small, private liberal arts school. — Forbes'

	]
	var randomNumber = Math.floor(Math.random() * quotesArray.length);
	document.getElementById('press-quote').textContent ='“'+ quotesArray [randomNumber].split(' — ')[0] + '”-' + quotesArray[randomNumber].split('—')[1];
