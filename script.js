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
  const alumni = [
    { name: "Paul Rudd", major: "Theater", photo: "https://via.placeholder.com/300x140?text=Paul+Rudd", note: "Actor, Ant-Man" },
    { name: "Holly Black", major: "English", photo: "https://via.placeholder.com/300x140?text=Holly+Black", note: "Author" },
    { name: "Jonas Chernick", major: "Film", photo: "https://via.placeholder.com/300x140?text=Jonas+Chernick", note: "Screenwriter & Actor" }
  ];

  function renderAlumni(list) {
    const grid = document.getElementById("alumniGrid");
    grid.innerHTML = "";
    list.forEach(alum => {
      const card = document.createElement("div");
      card.className = "card";
      card.innerHTML = `
        <img src="${alum.photo}" alt="${alum.name}">
        <div class="card-content">
          <h3>${alum.name}</h3>
          <p class="major">${alum.major}</p>
          <p class="note">${alum.note}</p>
        </div>
      `;
      grid.appendChild(card);
    });
  }

  renderAlumni(alumni);
});
