document.addEventListener('DOMContentLoaded', () => {

    // --- Custom Cursor ---
    const cursorDot = document.getElementById('cursor-dot');
    const cursorOutline = document.getElementById('cursor-outline');

    // Only enable custom cursor if not on a touch device
    if (window.matchMedia("(pointer: fine)").matches) {
        let cursorX = 0;
        let cursorY = 0;
        let outlineX = 0;
        let outlineY = 0;

        window.addEventListener('mousemove', (e) => {
            cursorX = e.clientX;
            cursorY = e.clientY;

            // Instantly move the dot
            cursorDot.style.left = `${cursorX}px`;
            cursorDot.style.top = `${cursorY}px`;
        });

        // Smooth follow for the outline
        const animateCursor = () => {
            const distX = cursorX - outlineX;
            const distY = cursorY - outlineY;

            outlineX += distX * 0.15;
            outlineY += distY * 0.15;

            cursorOutline.style.left = `${outlineX}px`;
            cursorOutline.style.top = `${outlineY}px`;

            requestAnimationFrame(animateCursor);
        };

        animateCursor();

        // Add hover effects for clickable items
        const clickables = document.querySelectorAll('a, button, .glass-card');
        clickables.forEach(el => {
            el.addEventListener('mouseenter', () => {
                document.body.classList.add('hover-active');
            });
            el.addEventListener('mouseleave', () => {
                document.body.classList.remove('hover-active');
            });
        });
    } else {
        // Hide custom cursors on mobile/touch
        cursorDot.style.display = 'none';
        cursorOutline.style.display = 'none';
    }


    // --- Dynamic Portfolio Loading ---
    const gamesGrid = document.getElementById('games-grid');

    const portfolioGames = [
        {
            title: "Gas Station Tycoon",
            link: "https://play.google.com/store/apps/details?id=com.CTT.gasstation3d",
            icon: "https://play-lh.googleusercontent.com/RdDHvUcIy8INPxNTkQBG2lli6n4oFYcBDubk5Pz7w363E8DL2d6wj1jFYFZa_GRRdMkK=s512-rw"
        },
        {
            title: "Spa Empire",
            link: "https://play.google.com/store/apps/details?id=com.CTT.myperfectspa",
            icon: "https://play-lh.googleusercontent.com/dHsZ07mVkq6lMlIfO1ClPwoCf_oO3XK9zgrLD9oRXSyN_gASG2xbfPEX7JFvPQEa3w=s512-rw"
        },
        {
            title: "Base Defense: Survival",
            link: "https://play.google.com/store/apps/details?id=com.CTT.zombiesurvivor",
            icon: "https://play-lh.googleusercontent.com/PDCRzBlSZoEI_XCeRdGBgtyvhMF7Fqw7KxOTCw3hGkUyL8w5-0F-FQjy-1vkEzKa8A=s512-rw"
        },
        {
            title: "Make Up Hole",
            link: "https://play.google.com/store/apps/details?id=com.CTTproduction.MakeupHole",
            icon: "https://play-lh.googleusercontent.com/sylJTkFCj0unnlhnfhVypl6yGeZgzFmejfHf0g06egvwDCII6qbk9JGBlRfX8bCcLpM4-hKYh7l2892px-5d=s512-rw"
        },
        {
            title: "Gear Defense: Survival",
            link: "https://play.google.com/store/apps/details?id=com.CTT.geardefence",
            icon: "https://play-lh.googleusercontent.com/QfP5BHm3r1w2R50z7rSNBpQI27qQoFsxDhHPXywajjJ6zDjqTUNPb3r5VapEQSigiyA=s512-rw"
        },
        {
            title: "Rug Tufting ASMR",
            link: "https://play.google.com/store/apps/details?id=com.rug.tuft",
            icon: "https://play-lh.googleusercontent.com/YbRf4PlRE2Vba6HBsPJUOILYfs0VH3aoRYuk5RNuwr8pnwhJLZtU6wT2ekNltP3PUA4=s512-rw"
        },
        {
            title: "Loop heroes",
            link: "https://play.google.com/store/apps/details?id=com.ctt.loophero",
            icon: "https://play-lh.googleusercontent.com/gxRY_is_6o5OUBZhWOcnfnhTL0QYV-xPfijmSieHQ2yFDEPVA9QrIeemUGH5-ap87QSPaLbhSbyEkr0gFtnXSw=s512-rw"
        },
        {
            title: "MineVenture",
            link: "https://play.google.com/store/apps/details?id=com.CTT.mineventure",
            icon: "https://play-lh.googleusercontent.com/Uu1Bk0oCJDubopX__0NVQHsOjJrj_H8vDSNH4_r51zHK0-cqE7lVcV_8dNwWVVq_gHx7=s512-rw"
        },
        {
            title: "Slingy Race",
            link: "https://play.google.com/store/apps/details?id=com.CTTproductions.SlingyRace",
            icon: "https://play-lh.googleusercontent.com/E-p1O2cX_tcCzcHlJw-Y3DafxN1pDz0kk_J5mwo28iNMs0ka8nH-4ach_wdh87CpI28P=s512-rw"
        },
        {
            title: "Trampoline run",
            link: "https://play.google.com/store/apps/details?id=com.ctt.trampoline",
            icon: "https://play-lh.googleusercontent.com/5aau3Qd3pSs2LtGIG28a-Lcyao-s_V7KyFXTHNUpB1OR-MRff5wRUpfxGe2ObEYy0RoY=s512-rw"
        },
        {
            title: "Gun Master",
            link: "https://play.google.com/store/apps/details?id=com.CTT.GunMaster",
            icon: "https://play-lh.googleusercontent.com/7v8Dc9-yH34tDjCQQBEDLVwRWcRwRiG1DmFqU5MWmsYeWmp_NxMhqWmdSgIC-z2Il5Q=s512-rw"
        },
        {
            title: "Flippy drive",
            link: "https://play.google.com/store/apps/details?id=com.CTTproductions.FlippyDrive",
            icon: "https://play-lh.googleusercontent.com/eyL5qcZBrvTkFe260GS6JdEcFvmd_QwKLeo3jDyaFXYcwAz68nfvhNb4IzEpI2IrTg=s512-rw"
        }
    ];

    portfolioGames.forEach((game, index) => {
        const card = document.createElement('div');
        card.className = 'game-card glass-card fade-up';
        card.style.transitionDelay = `${index * 0.05}s`;

        card.innerHTML = `
            <img src="${game.icon}" alt="${game.title} Icon" class="game-icon" loading="lazy">
            <h3 class="game-title">${game.title}</h3>
            <a href="${game.link}" target="_blank" class="btn btn-secondary game-link-btn">
                Get it <i data-lucide="download"></i>
            </a>
        `;

        gamesGrid.appendChild(card);
    });

    // Re-initialize Lucide icons for dynamically added content
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }


    // --- Scroll Reveal Animations ---
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: stop observing once revealed
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-up, .fade-in').forEach(el => {
        observer.observe(el);
    });


    // --- Navbar Scroll Effect ---
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

});
