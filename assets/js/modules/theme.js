const theme = {
    accordion: function() {
        var acc = document.querySelectorAll(".accordion-title");
        
        acc.forEach(function(item) {
            item.addEventListener("click", function() {
                this.classList.toggle("active");
                var panel = this.nextElementSibling;
                panel.style.display = panel.style.display === "block" ? "none" : "block";
            });
        });
    },
    
    backToTop: function() {
        var btn = document.querySelector('.btn-top');
        
        btn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                left: 0,
                behavior: "smooth"
            });
        });
    
        var throttleScroll = function(callback, limit) {
            var wait = false;
            return function() {
                if (!wait) {
                    callback.apply(null, arguments);
                    wait = true;
                    setTimeout(function() {
                        wait = false;
                    }, limit);
                }
            }
        };
    
        window.addEventListener('scroll', throttleScroll(function() {
            btn.classList.toggle('active', window.scrollY > btn.offsetTop );
        }, 200));
    }, 
    
    navigation: function() {
        const links = document.querySelectorAll('.menu-item');
        const sections = document.querySelectorAll('section');
        const header = document.getElementById("header");
        const sticky = header.offsetTop;
        
        function activateLink(id) {
            links.forEach(function(link) {
                link.classList.remove('active');
            });
            document.querySelector('.menu-item[href="#' + id + '"]').classList.add('active');
        }
    
        function scrollHandler() {
            const scrollY = window.scrollY;
            
            sections.forEach(function(sec) {
                const offset = sec.offsetTop;
                const id = sec.getAttribute('id');
                
                if (scrollY > offset - 50) {
                    activateLink(id);
                }
            });
            
            header.classList.toggle("fixed", window.scrollY > sticky);
        }
    
        links.forEach(function(link) {
            link.addEventListener('click', function(event) {
                event.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                document.getElementById(targetId).scrollIntoView({ behavior: 'smooth' });
                activateLink(targetId);
            });
        });
    
        window.addEventListener('scroll', scrollHandler);
    },
    
    testimonials: function() {
        new Swiper('#js-testimonials', {
            slidesPerView: 3,
            spaceBetween: 30,
            loop: true,
            pagination: {
                el: ".swiper-pagination",
                clickable: true,
            },
            navigation: {
                nextEl: ".next",
                prevEl: ".prev",
            },
            breakpoints: {
                0: {
                  slidesPerView: 1
                },
                768: {
                  slidesPerView: 2
                },
                1024: {
                  slidesPerView: 3
                }
              },
        });
    },

    toggleSidebar: function() {
        var btnOpen = document.querySelector('.btn-menu');
        var btnClose = document.querySelector('.close-btn');
        var menu = document.querySelector('.menu-mobile');
    
        btnOpen.addEventListener('click', function() {
            menu.classList.add('active');
        });
    
        btnClose.addEventListener('click', function() {
            menu.classList.remove('active');
        });
    },
    
    init: function() {
        this.accordion();
        this.backToTop();
        this.navigation();
        this.testimonials();
        this.toggleSidebar();
    }
};

document.addEventListener('DOMContentLoaded', function() {
    theme.init();
});