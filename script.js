/* ==========================================================================
   AURA FILMS - Custom JavaScript Logic
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

    // Global play listener: ensures only one video plays at a time (stops sound overlap)
    document.addEventListener('play', function(e) {
        if (e.target.tagName && e.target.tagName.toLowerCase() === 'video') {
            const allVideos = document.querySelectorAll('video');
            allVideos.forEach(video => {
                if (video !== e.target) {
                    video.pause();
                }
            });
        }
    }, true);

    // ---------------------------------------------------------
    // 1. Core State Configuration & Storage Initialization
    // ---------------------------------------------------------
    
    // Default Portfolio Items if none exist in localStorage
    const DEFAULT_PORTFOLIO = [
        {
            id: 'portfolio-intro',
            title: 'intro',
            type: 'video',
            category: 'Intro',
            aspect: 'vertical',
            imgUrl: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=800&q=80',
            videoUrl: 'assets/aura intro.mp4'
        },
        {
            id: 'portfolio-vratham',
            title: 'vratham',
            type: 'video',
            category: 'Wedding',
            aspect: 'vertical',
            imgUrl: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80',
            videoUrl: 'assets/aura vratham.mp4'
        },
        {
            id: 'portfolio-engagement',
            title: 'engagement',
            type: 'video',
            category: 'Wedding',
            aspect: 'vertical',
            imgUrl: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=80',
            videoUrl: 'assets/aura engagement .mp4'
        },
        {
            id: 'portfolio-wedding',
            title: 'wedding',
            type: 'video',
            category: 'Wedding',
            aspect: 'vertical',
            imgUrl: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=800&q=80',
            videoUrl: 'assets/aura wedding .mp4'
        },
        {
            id: 'portfolio-reception',
            title: 'reception',
            type: 'video',
            category: 'Wedding',
            aspect: 'vertical',
            imgUrl: 'https://images.unsplash.com/photo-1465847899084-d164df4dedc6?auto=format&fit=crop&w=800&q=80',
            videoUrl: 'assets/aura reception.mp4'
        },
        {
            id: 'portfolio-car-delivery',
            title: 'car delivery',
            type: 'video',
            category: 'Event',
            aspect: 'vertical',
            imgUrl: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80',
            videoUrl: 'assets/aura car delivery.mp4'
        }
    ];

    // Default System Config Settings
    const DEFAULT_SETTINGS = {
        upiId: '7780523279@ybl',
        upiName: 'Aura Films',
        whatsappNum: '7780523279',
        whatsappMsg: 'Hi Aura Films! I want to request a cinematic shoot session.',
        instagramUrl: 'https://www.instagram.com/aurafilms__official?igsh=aXdxOWxoOThqajFl&igsi=aXdxOWxoOThqajFl',
        emailAddress: 'aurafilmsofficial1@gmail.com',
        adminPass: 'aura@123',
        packages: [
            // Wedding Packages
            { id: 'wed-std', name: 'Standard Wedding Coverage', price: 9999, description: '5 Reels, Instant Delivery, Wedding Coverage, Mobile Portraits' },
            { id: 'wed-slv', name: 'Silver Wedding Coverage', price: 21999, description: '10 Reels, Multiple Functions, Raw Content Included, Mobile Portraits' },
            { id: 'wed-gld', name: 'Gold Wedding Coverage', price: 32999, description: '15 Reels, Full Wedding Coverage, Raw Content Included, Mobile Portraits' },
            { id: 'wed-plt', name: 'Platinum Wedding Coverage', price: 55000, description: '25 Reels, All Wedding Events, Premium Coverage, Mobile Portraits' },
            // Event Packages
            { id: 'evt-qck', name: 'Quick Reel Event Coverage', price: 1599, description: '1 Hour Coverage, 1 Edited Reel, WhatsApp Delivery' },
            { id: 'evt-excl', name: 'Exclusive Event Coverage', price: 2499, description: '2 Hours Coverage, Landscape Reel, One Key Moment' },
            { id: 'evt-std', name: 'Standard Event Coverage', price: 3899, description: '4 Hours Coverage, 2 Edited Reels, Small Events' },
            { id: 'evt-prem', name: 'Premium Event Coverage', price: 5599, description: '4 Hours Coverage, 3 Edited Reels, Raw Clips + Portraits' }
        ]
    };

    // Helper functions to fetch/store data
    const getPortfolio = () => {
        try {
            const val = localStorage.getItem('aura_portfolio');
            if (!val) return DEFAULT_PORTFOLIO;
            const parsed = JSON.parse(val);
            return (parsed && Array.isArray(parsed) && parsed.length > 0) ? parsed : DEFAULT_PORTFOLIO;
        } catch (e) {
            return DEFAULT_PORTFOLIO;
        }
    };
    const savePortfolio = (data) => localStorage.setItem('aura_portfolio', JSON.stringify(data));
    
    const getSettings = () => {
        try {
            const val = localStorage.getItem('aura_settings');
            if (!val) return DEFAULT_SETTINGS;
            const parsed = JSON.parse(val);
            return (parsed && parsed.packages && Array.isArray(parsed.packages) && parsed.packages.length > 0) ? parsed : DEFAULT_SETTINGS;
        } catch (e) {
            return DEFAULT_SETTINGS;
        }
    };
    const saveSettings = (data) => localStorage.setItem('aura_settings', JSON.stringify(data));

    const getBookings = () => {
        try {
            const val = localStorage.getItem('aura_bookings');
            if (!val) return [];
            const parsed = JSON.parse(val);
            return Array.isArray(parsed) ? parsed : [];
        } catch (e) {
            return [];
        }
    };
    const saveBookings = (data) => localStorage.setItem('aura_bookings', JSON.stringify(data));

    // Initialize databases if empty or out of date
    const localPortfolio = localStorage.getItem('aura_portfolio');
    if (!localPortfolio || !localPortfolio.includes('aura intro.mp4') || localPortfolio.includes('aura wedding')) {
        savePortfolio(DEFAULT_PORTFOLIO);
    }
    
    const localSettings = localStorage.getItem('aura_settings');
    let isValidSettings = false;
    if (localSettings) {
        try {
            const parsed = JSON.parse(localSettings);
            if (parsed && parsed.packages && Array.isArray(parsed.packages) && parsed.packages.length > 0) {
                isValidSettings = true;
            }
        } catch (e) {}
    }
    
    if (!isValidSettings) {
        saveSettings(DEFAULT_SETTINGS);
    } else {
        try {
            const current = JSON.parse(localSettings);
            let updated = false;
            
            const evtStd = current.packages.find(p => p.id === 'evt-std');
            if (evtStd && (evtStd.price === 3499 || evtStd.price === 3299)) {
                evtStd.price = 3899;
                evtStd.description = '4 Hours Coverage, 2 Edited Reels, Small Events';
                updated = true;
            }
            
            const evtPrem = current.packages.find(p => p.id === 'evt-prem');
            if (evtPrem && (evtPrem.price === 4999 || !evtPrem.description.includes('4 Hours'))) {
                evtPrem.price = 5599;
                evtPrem.description = '4 Hours Coverage, 3 Edited Reels, Raw Clips + Portraits';
                updated = true;
            }
            
            const evtExcl = current.packages.find(p => p.id === 'evt-excl');
            if (evtExcl && (evtExcl.description.includes('1 Premium Edited Reel') || !evtExcl.description.includes('Landscape'))) {
                evtExcl.description = '2 Hours Coverage, Landscape Reel, One Key Moment';
                updated = true;
            }

            if (current.emailAddress === 'aurafilms.in@gmail.com' || !current.emailAddress) {
                current.emailAddress = 'aurafilmsofficial1@gmail.com';
                updated = true;
            }

            if (current.adminPass !== 'aura@123') {
                current.adminPass = 'aura@123';
                updated = true;
            }
            
            // Auto-upgrade stored descriptions to contain Mobile Portraits
            current.packages.forEach(pkg => {
                if (pkg.id === 'wed-std' && !pkg.description.includes('Mobile Portraits')) {
                    pkg.description = '5 Reels, Instant Delivery, Wedding Coverage, Mobile Portraits';
                    updated = true;
                }
                if (pkg.id === 'wed-slv' && !pkg.description.includes('Mobile Portraits')) {
                    pkg.description = '10 Reels, Multiple Functions, Raw Content Included, Mobile Portraits';
                    updated = true;
                }
                if (pkg.id === 'wed-gld' && !pkg.description.includes('Mobile Portraits')) {
                    pkg.description = '15 Reels, Full Wedding Coverage, Raw Content Included, Mobile Portraits';
                    updated = true;
                }
                if (pkg.id === 'wed-plt' && !pkg.description.includes('Mobile Portraits')) {
                    pkg.description = '25 Reels, All Wedding Events, Premium Coverage, Mobile Portraits';
                    updated = true;
                }
            });
            
            if (!current.instagramUrl || current.instagramUrl.includes('aura.films') || !current.instagramUrl.includes('aurafilms__official')) {
                current.instagramUrl = 'https://www.instagram.com/aurafilms__official?igsh=aXdxOWxoOThqajFl&igsi=aXdxOWxoOThqajFl';
                updated = true;
            }

            if (updated) {
                saveSettings(current);
            }
        } catch (e) {
            console.error("Failed to upgrade settings", e);
        }
    }

    // ---------------------------------------------------------
    // 2. Shutter Preloader Dismissal
    // ---------------------------------------------------------
    const shutterLoader = document.getElementById('shutter-loader');
    const body = document.body;

    window.addEventListener('load', () => {
        // Keep preloader active for exactly 2.2s for high-impact entrance branding
        setTimeout(() => {
            if (shutterLoader) {
                shutterLoader.classList.add('loaded');
                body.classList.remove('loading');
                
                // Complete preloader cleanup
                setTimeout(() => {
                    shutterLoader.style.display = 'none';
                }, 800);
            }
        }, 2200);
    });

    // Backup preloader timeout (4.5s max)
    setTimeout(() => {
        if (shutterLoader && !shutterLoader.classList.contains('loaded')) {
            shutterLoader.classList.add('loaded');
            body.classList.remove('loading');
            setTimeout(() => {
                shutterLoader.style.display = 'none';
            }, 800);
        }
    }, 4500);

    // Initialize Lucide Icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // ---------------------------------------------------------
    // 3. Navigation Controls
    // ---------------------------------------------------------
    const mobileToggle = document.getElementById('mobile-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const navbar = document.querySelector('.navbar');

    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', () => {
            navMenu.classList.toggle('open');
            const isOpen = navMenu.classList.contains('open');
            mobileToggle.innerHTML = isOpen ? '<i data-lucide="x"></i>' : '<i data-lucide="menu"></i>';
            lucide.createIcons();
        });
    }

    // Close mobile nav menu on clicking link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu && navMenu.classList.contains('open')) {
                navMenu.classList.remove('open');
                mobileToggle.innerHTML = '<i data-lucide="menu"></i>';
                lucide.createIcons();
            }
        });
    });

    // Scrolled header background
    window.addEventListener('scroll', () => {
        if (navbar) {
            if (window.scrollY > 40) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }
    });

    // ---------------------------------------------------------
    // 4. Contact & Redirects Loader
    // ---------------------------------------------------------
    function reloadRedirects() {
        const settings = getSettings();
        
        // WhatsApp link setup
        const waLink = document.getElementById('whatsapp-link');
        if (waLink) {
            const encodedText = encodeURIComponent(settings.whatsappMsg);
            waLink.href = `https://wa.me/91${settings.whatsappNum}?text=${encodedText}`;
        }

        // Instagram link setup
        const igLink = document.getElementById('instagram-link');
        if (igLink) {
            igLink.href = settings.instagramUrl;
        }

        // Email link setup
        const emailLink = document.getElementById('email-link');
        if (emailLink) {
            emailLink.href = `mailto:${settings.emailAddress}`;
        }
    }
    reloadRedirects();

    // ---------------------------------------------------------
    // 5. Portfolio Grid Rendering & Lightbox
    // ---------------------------------------------------------
    const galleryGrid = document.getElementById('gallery-grid');
    const filterButtons = document.querySelectorAll('.filter-btn');

    // Lightbox references
    let lightbox = null;
    
    function createLightbox() {
        lightbox = document.createElement('div');
        lightbox.className = 'lightbox-modal';
        lightbox.innerHTML = `
            <div class="lightbox-wrapper">
                <button class="close-modal" id="close-lightbox"><i data-lucide="x"></i></button>
                <div id="lightbox-media-container"></div>
                <div class="lightbox-title" id="lightbox-media-title"></div>
            </div>
        `;
        document.body.appendChild(lightbox);

        lightbox.querySelector('#close-lightbox').addEventListener('click', () => {
            closeLightboxModal();
        });
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) closeLightboxModal();
        });
    }

    function openLightboxModal(item) {
        if (!lightbox) createLightbox();
        
        const container = lightbox.querySelector('#lightbox-media-container');
        const titleEl = lightbox.querySelector('#lightbox-media-title');
        container.innerHTML = '';
        titleEl.textContent = item.title;

        if (item.type === 'video') {
            // Check if embeddable or local MP4
            if (item.videoUrl && item.videoUrl.endsWith('.mp4')) {
                container.innerHTML = `<video class="lightbox-video" controls autoplay src="${item.videoUrl}" style="max-height:80vh; max-width:100%; border-radius:12px; display:block; margin:0 auto; outline:none;"></video>`;
            } else if (item.videoUrl && (item.videoUrl.includes('embed') || item.videoUrl.includes('youtube.com') || item.videoUrl.includes('vimeo'))) {
                container.innerHTML = `<iframe class="lightbox-iframe" src="${item.videoUrl}" allow="autoplay; encrypted-media" allowfullscreen></iframe>`;
            } else {
                container.innerHTML = `<img class="lightbox-media" src="${item.imgUrl}" alt="${item.title}"><p style="text-align:center; font-size:0.8rem; margin-top:1rem; color:var(--text-secondary);">Video URL is not directly embeddable. URL: ${item.videoUrl}</p>`;
            }
        } else {
            container.innerHTML = `<img class="lightbox-media" src="${item.imgUrl}" alt="${item.title}">`;
        }

        lightbox.classList.add('open');
        lucide.createIcons();
    }

    function closeLightboxModal() {
        if (lightbox) {
            lightbox.classList.remove('open');
            // stop any iframe playing
            lightbox.querySelector('#lightbox-media-container').innerHTML = '';
        }
    }

    function renderPortfolio(filter = 'all') {
        if (!galleryGrid) return;
        
        const items = getPortfolio();
        galleryGrid.innerHTML = '';

        const filteredItems = items.filter(item => filter === 'all' || item.type === filter);

        if (filteredItems.length === 0) {
            galleryGrid.innerHTML = `<p style="grid-column: 1/-1; text-align: center; color: var(--text-muted); padding: 3rem;">No work items added yet.</p>`;
            return;
        }

        filteredItems.forEach(item => {
            const card = document.createElement('div');
            card.className = `work-card`;
            card.setAttribute('data-id', item.id);
            
            const aspect = item.aspect || (item.type === 'video' ? 'vertical' : 'horizontal');
            const ratioClass = aspect === 'vertical' ? 'video-ratio' : (aspect === 'square' ? 'square-ratio' : 'horizontal-ratio');
            const isVideo = item.type === 'video';

            if (isVideo && item.videoUrl && item.videoUrl.endsWith('.mp4')) {
                // Seek to 1.0s (first second) to skip fade-in black screen and force it as the cover thumbnail
                const videoSrc = item.videoUrl.includes('#t=') ? item.videoUrl : `${item.videoUrl}#t=1`;
                card.innerHTML = `
                    <div class="work-thumbnail-wrapper ${ratioClass}" style="background:#000; border-radius:12px; overflow:hidden; position:relative;">
                        <video class="work-video-player" controls playsinline preload="metadata" src="${videoSrc}" style="width:100%; height:100%; object-fit:cover; display:block;"></video>
                    </div>
                    <div class="work-card-details" style="padding: 1rem 0.5rem 0.5rem 0.5rem; text-align: left;">
                        <h4 class="work-title" style="color: var(--text-primary); font-family: var(--font-serif); font-size: 1.45rem; font-style: italic; font-weight: 400; text-transform: capitalize; margin: 0; text-shadow: none;">${item.title}</h4>
                    </div>
                `;

                // Add time duration overlay badge
                const videoEl = card.querySelector('.work-video-player');
                const wrapper = card.querySelector('.work-thumbnail-wrapper');
                if (videoEl && wrapper) {
                    const handleMetadata = () => {
                        const duration = videoEl.duration;
                        if (duration && !isNaN(duration)) {
                            const mins = Math.floor(duration / 60);
                            const secs = Math.floor(duration % 60).toString().padStart(2, '0');
                            const durationStr = `${mins}:${secs}`;
                            
                            if (!wrapper.querySelector('.video-duration-badge')) {
                                const badge = document.createElement('span');
                                badge.className = 'video-duration-badge';
                                badge.style.cssText = 'position: absolute; top: 0.75rem; right: 0.75rem; background: rgba(0, 0, 0, 0.75); color: #ffffff; padding: 0.25rem 0.5rem; border-radius: 4px; font-size: 0.7rem; font-weight: 700; z-index: 5; pointer-events: none; font-family: var(--font-body); letter-spacing: 0.5px;';
                                badge.textContent = durationStr;
                                wrapper.appendChild(badge);
                            }
                        }
                    };
                    if (videoEl.readyState >= 1) {
                        handleMetadata();
                    } else {
                        videoEl.addEventListener('loadedmetadata', handleMetadata);
                    }
                }
            } else {
                card.innerHTML = `
                    <div class="work-thumbnail-wrapper ${ratioClass}" style="border-radius:12px; overflow:hidden;">
                        <img class="work-img" src="${item.imgUrl}" alt="${item.title}">
                        <div class="work-overlay">
                            <h4 class="work-title">${item.title}</h4>
                            <p class="work-desc">${isVideo ? '🎞️ Cinematic Video Reel' : '📱 Creative Photo Shoot'}</p>
                        </div>
                        ${isVideo ? `
                            <div class="play-indicator">
                                <i data-lucide="play"></i>
                            </div>
                        ` : ''}
                    </div>
                `;

                card.addEventListener('click', () => {
                    openLightboxModal(item);
                });
            }

            galleryGrid.appendChild(card);
        });

        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }
    }

    // Connect filter buttons
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            renderPortfolio(btn.getAttribute('data-filter'));
        });
    });

    renderPortfolio();

    // ---------------------------------------------------------
    // 6. Booking System & Multi-Step Wizard
    // ---------------------------------------------------------
    const bookingDateInput = document.getElementById('booking-date');
    const packageSelect = document.getElementById('service-package');
    const summaryPrice = document.getElementById('summary-price');
    const summaryPkgName = document.getElementById('summary-package-name');
    const bookingForm = document.getElementById('booking-form');

    // Wizard Nav Elements
    const stepProgressFill = document.getElementById('step-progress-fill');
    const stepNodes = document.querySelectorAll('.step-node');
    const wizardPanels = document.querySelectorAll('.wizard-panel');
    const typeCards = document.querySelectorAll('.type-card');
    const packagesListContainer = document.getElementById('packages-list-container');
    
    const backToStep1Btn = document.getElementById('back-to-step1');
    const backToStep2Btn = document.getElementById('back-to-step2');
    const proceedToStep3Btn = document.getElementById('proceed-to-step3');

    // Receipt modal references
    const receiptModal = document.getElementById('receipt-modal');
    const receiptContent = document.getElementById('receipt-content');
    const closeReceiptBtn = document.getElementById('close-receipt-btn');
    const downloadReceiptBtn = document.getElementById('download-receipt-btn');

    // Packages detail spec matching user screenshots
    const WIZARD_PACKAGES_BY_TYPE = {
        wedding: [
            { id: 'wed-std', name: 'Standard', icon: 'heart', badge: 'starter', badgeLabel: 'Starter', subtext: 'Best for one small function or simple coverage.', priceDesc: 'Fast reel-first delivery', desc: 'Simple wedding moments captured as clean, readymade reels.', features: ['5 Reels', 'Instant Delivery', 'Wedding Coverage', 'Mobile Portraits'] },
            { id: 'wed-slv', name: 'Silver', icon: 'sparkles', badge: 'most-booked', badgeLabel: 'Most Booked', subtext: 'Best for Haldi, Mehendi or wedding-day mix.', priceDesc: 'Most couples choose this', desc: 'Balanced package for couples who want all key moments covered.', features: ['10 Reels', 'Multiple Functions', 'Raw Content Included', 'Mobile Portraits'] },
            { id: 'wed-gld', name: 'Gold', icon: 'crown', badge: 'fuller-coverage', badgeLabel: 'Fuller Coverage', subtext: 'Best for two or more important functions.', priceDesc: 'More moments, more reels', desc: 'Extended storytelling for multiple wedding moments.', features: ['15 Reels', 'Full Wedding Coverage', 'Raw Content Included', 'Mobile Portraits'] },
            { id: 'wed-plt', name: 'Platinum', icon: 'gem', badge: 'premium', badgeLabel: 'Premium', subtext: 'Best for complete wedding coverage.', priceDesc: 'Premium full-event coverage', desc: 'Complete reel-first storytelling across all major wedding events.', features: ['25 Reels', 'All Wedding Events', 'Premium Coverage', 'Mobile Portraits'] }
        ],
        event: [
            { id: 'evt-qck', name: 'Quick Reel', icon: 'zap', badge: 'starter', badgeLabel: 'Quick', subtext: 'Best for one short moment.', priceDesc: 'Low-friction starter plan  •  No raw data', desc: 'For one quick highlight moment from a small event.', features: ['1 Hour Coverage', '1 Edited Reel', 'WhatsApp Delivery'] },
            { id: 'evt-excl', name: 'Exclusive', icon: 'star', badge: 'most-booked', badgeLabel: 'Most Booked', subtext: 'Best for one main event moment.', priceDesc: '2 Hours limit  •  No raw data', desc: 'One premium reel focused on your key moment, well edited.', features: ['2 Hours Coverage', 'Landscape Reel', 'One Key Moment (Main Event)'] },
            { id: 'evt-std', name: 'Standard', icon: 'calendar', badge: 'balanced', badgeLabel: 'Balanced', subtext: 'Best for birthdays and small parties.', priceDesc: 'More moments covered  •  No raw data', desc: 'For small events where you want more than one reel.', features: ['4 Hours Coverage', '2 Edited Reels', 'Small Events'] },
            { id: 'evt-prem', name: 'Premium', icon: 'award', badge: 'best-value', badgeLabel: 'Best Value', subtext: 'Best for complete event coverage.', priceDesc: 'Best value for events  •  No raw data', desc: 'For complete event coverage with reels, raw clips & more.', features: ['4 Hours Coverage', '3 Edited Reels', 'Raw Clips + Portraits'] }
        ],
        brand: [
            { id: 'brd-promo', name: 'Business Promotion', call: true, icon: 'megaphone', badge: 'popular', badgeLabel: 'Popular', desc: 'Promote your store, service or offer.', features: ['Business Story', 'Reel Direction'] },
            { id: 'brd-launch', name: 'Launch / Event', call: true, icon: 'rocket', badge: 'starter', badgeLabel: 'Event', desc: 'Openings, exhibitions and corporate events.', features: ['Event Highlights', 'Brand Moments'] },
            { id: 'brd-showcase', name: 'Product Showcase', call: true, icon: 'shopping-bag', badge: 'starter', badgeLabel: 'Product', desc: 'Show products with clean premium visuals.', features: ['Product Focus', 'Detail Shots'] },
            { id: 'brd-social', name: 'Social Media Content', call: true, icon: 'instagram', badge: 'premium', badgeLabel: 'Monthly', desc: 'Regular Instagram and campaign content.', features: ['Content Batches', 'Monthly Ideas'] },
            { id: 'brd-other', name: 'Other Business Requirement', call: true, icon: 'help-circle', badge: 'starter', badgeLabel: 'Popular', desc: 'For custom brand or business requirements.', features: ['Custom Scope', 'Clear Callback'] }
        ],
        guidance: [
            { id: 'gd-evt', name: 'I Have an Event Guidance', call: true, icon: 'help-circle', badge: 'guide-me', badgeLabel: 'Guide Me', desc: 'Birthday, engagement, party or special moment.', features: ['Package Suggestion', 'Budget Clarity', 'Quick Call'] },
            { id: 'gd-wed', name: 'Wedding Related Guidance', call: true, icon: 'heart', badge: 'guide-me', badgeLabel: 'Guide Me', desc: 'Wedding, Haldi, Mehendi or reception.', features: ['Function Mapping', 'Coverage Guidance', 'Date Check'] },
            { id: 'gd-brd', name: 'Business Content Guidance', call: true, icon: 'megaphone', badge: 'guide-me', badgeLabel: 'Guide Me', desc: 'Brand, product, launch or social content.', features: ['Scope Planning', 'Content Direction', 'Custom Quote'] }
        ]
    };



    // Wizard State
    let activeStep = 1;
    let selectedType = null;
    let selectedPackage = null;
    let selectedSlot = null;

    // Minimum booking date is today
    if (bookingDateInput) {
        const today = new Date();
        const yyyy = today.getFullYear();
        const mm = String(today.getMonth() + 1).padStart(2, '0');
        const dd = String(today.getDate()).padStart(2, '0');
        bookingDateInput.min = `${yyyy}-${mm}-${dd}`;
    }

    // Initialize Step 1 cards click listener
    typeCards.forEach(card => {
        card.addEventListener('click', () => {
            typeCards.forEach(c => c.classList.remove('selected'));
            card.classList.add('selected');
            
            const type = card.getAttribute('data-type');
            selectBookingType(type);
        });
    });

    // Handle Category Type Select
    function selectBookingType(type) {
        selectedType = type;
        selectedPackage = null;
        if (proceedToStep3Btn) proceedToStep3Btn.disabled = true;

        // Render correct packages list
        renderPackagesList(type);

        // Adjust Panel headings based on Category Type
        const tagEl = document.getElementById('package-panel-tag');
        const titleEl = document.getElementById('package-panel-title');
        const subtitleEl = document.getElementById('package-panel-subtitle');

        if (tagEl && titleEl && subtitleEl) {
            if (type === 'wedding') {
                tagEl.innerHTML = '✦ Wedding Coverage ✦';
                titleEl.innerHTML = 'Choose <span class="accent">your package</span>';
                subtitleEl.textContent = 'Choose coverage. We will confirm functions and date on WhatsApp.';
            } else if (type === 'event') {
                tagEl.innerHTML = '✦ Event Reels ✦';
                titleEl.innerHTML = 'Choose <span class="accent">your package</span>';
                subtitleEl.textContent = 'Choose how much coverage you need. We will confirm slot and timing on call.';
            } else if (type === 'brand') {
                tagEl.innerHTML = '✦ Brand Content ✦';
                titleEl.innerHTML = 'Choose <span class="accent">requirement</span>';
                subtitleEl.textContent = 'Choose your business requirement. We will prepare the right plan on call.';
            } else if (type === 'guidance') {
                tagEl.innerHTML = '✦ Help Me Choose ✦';
                titleEl.innerHTML = 'Choose <span class="accent">guidance</span>';
                subtitleEl.textContent = 'Pick the closest option. We will guide you on WhatsApp.';
            }
        }

        // Advance to Step 2
        activeStep = 2;
        updateWizardUI();
    }

    // Render package rows inside Step 2
    function renderPackagesList(type) {
        if (!packagesListContainer) return;
        packagesListContainer.innerHTML = '';

        const packages = WIZARD_PACKAGES_BY_TYPE[type] || [];
        const settings = getSettings();

        packages.forEach(pkg => {
            const card = document.createElement('div');
            card.className = 'package-row-card';
            card.setAttribute('data-id', pkg.id);

            // Fetch live rate from settings DB for priced items
            let priceLabelHtml = '';
            if (pkg.call) {
                priceLabelHtml = `
                    <span class="price-val-call">
                        Plan on call <i data-lucide="arrow-right"></i>
                    </span>
                `;
            } else {
                const dbPkg = settings.packages.find(p => p.id === pkg.id);
                const price = dbPkg ? dbPkg.price : 0;
                const showStartsFrom = type === 'wedding';
                priceLabelHtml = `
                    ${showStartsFrom ? `<span class="price-label-small">Starts from</span>` : ''}
                    <span class="price-val">₹${price.toLocaleString()}</span>
                    ${pkg.priceDesc ? `<span class="price-desc">${pkg.priceDesc}</span>` : ''}
                `;
            }

            // Create features pills markup
            let featuresHtml = '';
            if (pkg.features && pkg.features.length > 0) {
                featuresHtml = `
                    <div class="package-row-features">
                        ${pkg.features.map(f => `
                            <span class="feature-pill">
                                <i data-lucide="check"></i>
                                ${f}
                            </span>
                        `).join('')}
                    </div>
                `;
            }

            let disclaimerHtml = '';
            if (type === 'event') {
                disclaimerHtml = `<br><small style="display:block; margin-top:0.35rem; color:#b45309; font-weight:600;">* Extra hours beyond booked time & requests for photos/pics incur extra charges.</small>`;
            }

            const badgeContainerHtml = pkg.badge ? `
                <div class="package-row-badge-container">
                    <span class="package-row-badge ${pkg.badge}">${pkg.badgeLabel}</span>
                    ${pkg.subtext ? `<span class="package-row-subtext">${pkg.subtext}</span>` : ''}
                </div>
            ` : '';

            card.innerHTML = `
                ${badgeContainerHtml}
                <div class="package-row-icon">
                    <i data-lucide="${pkg.icon || 'help-circle'}"></i>
                </div>
                <div class="package-row-details">
                    <h4>${pkg.name}</h4>
                    <p>${pkg.desc}${disclaimerHtml}</p>
                    ${featuresHtml}
                </div>
                <div class="package-row-price-area">
                    ${priceLabelHtml}
                </div>
                <div class="package-radio-circle"></div>
            `;

            // Row click listener
            card.addEventListener('click', () => {
                document.querySelectorAll('.package-row-card').forEach(c => c.classList.remove('selected'));
                card.classList.add('selected');
                selectBookingPackage(pkg);
            });

            packagesListContainer.appendChild(card);
        });

        // Initialize Lucide icons inside dynamic list
        if (window.lucide) window.lucide.createIcons();
    }

    // Set selected package
    function selectBookingPackage(pkg) {
        selectedPackage = pkg;
        if (proceedToStep3Btn) proceedToStep3Btn.disabled = false;

        // Sync to hidden legacy select element
        if (packageSelect) {
            packageSelect.innerHTML = `<option value="${pkg.id}" selected>${pkg.name}</option>`;
        }

        // Bind Summary price & names
        const settings = getSettings();
        if (pkg.call) {
            if (summaryPrice) summaryPrice.textContent = 'Plan on call';
            if (summaryPkgName) summaryPkgName.textContent = pkg.name;
        } else {
            const dbPkg = settings.packages.find(p => p.id === pkg.id);
            const price = dbPkg ? dbPkg.price : 0;
            if (summaryPrice) summaryPrice.textContent = `₹${price.toLocaleString()}`;
            if (summaryPkgName) summaryPkgName.textContent = pkg.name;
        }
    }

    // Update Step panels & timeline indicators
    function updateWizardUI() {
        // Toggle Panel displays
        wizardPanels.forEach((panel, idx) => {
            if (idx + 1 === activeStep) {
                panel.classList.add('active');
            } else {
                panel.classList.remove('active');
            }
        });

        // Toggle nodes active/completed status
        stepNodes.forEach(node => {
            const stepNum = parseInt(node.getAttribute('data-step'));
            node.classList.remove('active', 'completed');
            
            if (stepNum === activeStep) {
                node.classList.add('active');
            } else if (stepNum < activeStep) {
                node.classList.add('completed');
            }
        });

        // Update progress bar fill
        if (stepProgressFill) {
            if (activeStep === 1) stepProgressFill.style.width = '0%';
            if (activeStep === 2) stepProgressFill.style.width = '50%';
            if (activeStep === 3) stepProgressFill.style.width = '100%';
        }

        // Scroll booking container into view smoothly
        const bookingSec = document.getElementById('booking');
        if (bookingSec) {
            bookingSec.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }

    // Back & Next Buttons listeners
    if (backToStep1Btn) {
        backToStep1Btn.addEventListener('click', () => {
            activeStep = 1;
            updateWizardUI();
        });
    }

    if (backToStep2Btn) {
        backToStep2Btn.addEventListener('click', () => {
            activeStep = 2;
            updateWizardUI();
        });
    }

    if (proceedToStep3Btn) {
        proceedToStep3Btn.addEventListener('click', () => {
            activeStep = 3;
            updateWizardUI();
            validateStep3Form();
        });
    }

    const bookingTimeInput = document.getElementById('booking-time');

    // Calculate slot label on custom time picker changes
    if (bookingTimeInput) {
        bookingTimeInput.addEventListener('change', () => {
            const timeVal = bookingTimeInput.value; // format: "HH:MM"
            if (timeVal) {
                // Convert 24h format to 12h readable time
                const [hours, minutes] = timeVal.split(':');
                const hh = parseInt(hours, 10);
                const ampm = hh >= 12 ? 'PM' : 'AM';
                const formattedHours = hh % 12 || 12;
                const formattedTime = `${formattedHours}:${minutes} ${ampm}`;
                
                selectedSlot = {
                    id: `time-${timeVal}`,
                    label: formattedTime
                };
            } else {
                selectedSlot = null;
            }
            validateStep3Form();
        });
    }

    if (bookingDateInput) {
        bookingDateInput.addEventListener('change', () => {
            validateStep3Form();
        });
    }

    // Step 3 inputs state validation
    function validateStep3Form() {
        const clientName = document.getElementById('client-name').value.trim();
        const clientPhone = document.getElementById('client-phone').value.trim();
        const clientEmail = document.getElementById('client-email').value.trim();
        const selectedDate = bookingDateInput ? bookingDateInput.value : '';
        const selectedTimeVal = bookingTimeInput ? bookingTimeInput.value : '';

        // If package is call-based, slots are not strictly mandatory.
        // Otherwise, they must have selected a valid time.
        const isSlotValid = (selectedPackage && selectedPackage.call) || selectedTimeVal;
        const isFormValid = clientName && clientPhone && clientEmail && selectedDate && isSlotValid;
        
        const confirmBookingWa = document.getElementById('confirm-booking-wa');
        const confirmBookingEmail = document.getElementById('confirm-booking-email');
        if (confirmBookingWa && confirmBookingEmail) {
            confirmBookingWa.disabled = !isFormValid;
            confirmBookingEmail.disabled = !isFormValid;
        }
    }

    // Restrict phone inputs to numeric digits only
    const clientPhoneInput = document.getElementById('client-phone');
    if (clientPhoneInput) {
        clientPhoneInput.addEventListener('input', function() {
            this.value = this.value.replace(/[^0-9]/g, '');
        });
    }
    const joinPhoneInput = document.getElementById('join-phone');
    if (joinPhoneInput) {
        joinPhoneInput.addEventListener('input', function() {
            this.value = this.value.replace(/[^0-9]/g, '');
        });
    }

    // Bind inputs to check states
    const formInputs = document.querySelectorAll('.booking-form-wizard input');
    formInputs.forEach(input => {
        input.addEventListener('input', validateStep3Form);
    });

    // Stubs for checkout modal references to avoid JS crash (gateway bypassed)
    const paymentModal = document.getElementById('payment-modal');
    const closePaymentModalBtn = document.getElementById('close-payment-modal');
    const paymentPkgName = document.getElementById('payment-package-name');
    const paymentSlotDetails = document.getElementById('payment-slot-details');
    const paymentPkgCost = document.getElementById('payment-package-cost');
    const checkoutUpiIdEl = document.getElementById('checkout-upi-id');
    const upiQrImage = document.getElementById('upi-qr-image');
    const mobileUpiIntent = document.getElementById('mobile-upi-intent');
    const payTabBtns = document.querySelectorAll('.pay-tab-btn');
    const upiPanel = document.getElementById('upi-pay-panel');
    const cardPanel = document.getElementById('card-pay-panel');
    const cardHolderInput = document.getElementById('card-holder-input');
    const cardNumberInput = document.getElementById('card-number-input');
    const cardExpiryInput = document.getElementById('card-expiry-input');
    const cardCvvInput = document.getElementById('card-cvv-input');
    const visualCardNumber = document.getElementById('visual-card-number');
    const visualCardHolder = document.getElementById('visual-card-holder');
    const visualCardExpiry = document.getElementById('visual-card-expiry');
    const processPaymentBtn = document.getElementById('process-payment-btn');

    let currentBookingData = null;
    let selectedPaymentMethod = 'upi';

    const confirmBookingWa = document.getElementById('confirm-booking-wa');
    const confirmBookingEmail = document.getElementById('confirm-booking-email');
    let lastSubmitter = 'whatsapp';

    if (confirmBookingWa) {
        confirmBookingWa.addEventListener('click', () => {
            lastSubmitter = 'whatsapp';
        });
    }
    if (confirmBookingEmail) {
        confirmBookingEmail.addEventListener('click', () => {
            lastSubmitter = 'email';
        });
    }

    // Direct booking confirmation on submit
    if (bookingForm) {
        bookingForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            if (!selectedPackage) return;
            
            const settings = getSettings();
            const clientName = document.getElementById('client-name').value.trim();
            const clientPhone = document.getElementById('client-phone').value.trim();
            const clientEmail = document.getElementById('client-email').value.trim();
            const selectedDate = bookingDateInput ? bookingDateInput.value : '';
            
            const slotLabel = selectedSlot ? selectedSlot.label : 'Call Confirmation';
            
            // Check if priced package requires a start time slot selection
            if (!selectedPackage.call && !selectedSlot) {
                alert('Please select a start time to proceed.');
                return;
            }

            const dbPkg = settings.packages.find(p => p.id === selectedPackage.id);
            const price = dbPkg ? dbPkg.price : 0;
            const packagePriceText = selectedPackage.call ? 'Plan on Call' : `₹${price.toLocaleString()}`;

            // 1. Formulate booking payload & save to local DB
            const bookingData = {
                id: 'booking-' + Date.now(),
                clientName,
                clientPhone,
                clientEmail,
                date: selectedDate,
                slotId: selectedSlot ? selectedSlot.id : 'slot-call',
                slotLabel: slotLabel,
                packageId: selectedPackage.id,
                packageName: selectedPackage.name,
                packagePrice: selectedPackage.call ? 0 : price,
                status: 'pending',
                paymentMethod: selectedPackage.call ? 'call' : 'Direct Booking',
                transactionRef: selectedPackage.call ? 'WhatsApp Request' : 'Time Slot Reserved',
                bookingTime: new Date().toLocaleString()
            };

            const bookings = getBookings();
            bookings.push(bookingData);
            saveBookings(bookings);

            // 2. Formulate redirection parameters (WhatsApp text and mailto link)
            const msg = `Hi Aura Films! I want to coordinate a shoot booking.\n\n` + 
                        `*Category*: ${selectedType.toUpperCase()}\n` +
                        `*Requirement*: ${selectedPackage.name}\n` +
                        `*Price*: ${packagePriceText}\n` +
                        `*Client*: ${clientName}\n` +
                        `*Phone*: ${clientPhone}\n` +
                        `*Email*: ${clientEmail}\n` +
                        `*Proposed Date*: ${selectedDate}\n` +
                        `*Proposed Slot*: ${slotLabel}`;
            
            const waUrl = `https://wa.me/91${settings.whatsappNum}?text=${encodeURIComponent(msg)}`;

            const emailSubject = `New Shoot Booking - ${clientName}`;
            const emailBody = `Hi Aura Films,\n\nA new shoot booking slot has been reserved on the website. Here are the details:\n\n` +
                              `Category: ${selectedType.toUpperCase()}\n` +
                              `Package: ${selectedPackage.name}\n` +
                              `Price: ${packagePriceText}\n` +
                              `Client Name: ${clientName}\n` +
                              `Phone: ${clientPhone}\n` +
                              `Email: ${clientEmail}\n` +
                              `Date: ${selectedDate}\n` +
                              `Time Slot: ${slotLabel}\n\nPlease review and approve this booking in the Admin settings dashboard.`;
            
            const mailtoUrl = `mailto:${settings.emailAddress}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;

            // 3. Redirect to chosen method
            if (lastSubmitter === 'email') {
                window.location.href = mailtoUrl;
            } else {
                window.open(waUrl, '_blank');
            }

            // 4. Open receipt modal on-screen for priced packages
            if (!selectedPackage.call) {
                renderReceipt(bookingData);
                if (receiptModal) {
                    receiptModal.classList.add('open');
                }
            } else {
                alert(`Booking details saved! Opening ${lastSubmitter === 'email' ? 'Email' : 'WhatsApp'} client...`);
            }

            // 5. Reset booking forms & wizard states
            bookingForm.reset();
            if (summaryPrice) summaryPrice.textContent = '₹0';
            selectedSlot = null;
            
            const btnWa = document.getElementById('confirm-booking-wa');
            const btnEmail = document.getElementById('confirm-booking-email');
            if (btnWa) btnWa.disabled = true;
            if (btnEmail) btnEmail.disabled = true;
            
            activeStep = 1;
            document.querySelectorAll('.type-card').forEach(c => c.classList.remove('selected'));
            updateWizardUI();
        });
    }

    function renderReceipt(booking) {
        if (!receiptContent) return;

        receiptContent.innerHTML = `
            <div class="receipt-row">
                <span class="label">Receipt No:</span>
                <span class="value">${booking.id}</span>
            </div>
            <div class="receipt-row">
                <span class="label">Client Name:</span>
                <span class="value">${booking.clientName}</span>
            </div>
            <div class="receipt-row">
                <span class="label">Contact Info:</span>
                <span class="value">${booking.clientPhone} / ${booking.clientEmail}</span>
            </div>
            <div class="receipt-row">
                <span class="label">Shoot Date:</span>
                <span class="value">${booking.date}</span>
            </div>
            <div class="receipt-row">
                <span class="label">Time Slot:</span>
                <span class="value">${booking.slotLabel}</span>
            </div>
            <div class="receipt-row">
                <span class="label">Package:</span>
                <span class="value">${booking.packageName}</span>
            </div>
            <div class="receipt-row">
                <span class="label">Gateway:</span>
                <span class="value">${booking.paymentMethod}</span>
            </div>
            <div class="receipt-row">
                <span class="label">Ref / UTR ID:</span>
                <span class="value" style="font-family: monospace;">${booking.transactionRef}</span>
            </div>
            <div class="receipt-row">
                <span class="label">Status:</span>
                <span class="value" style="font-weight:700; color: ${booking.status === 'confirmed' ? 'var(--success)' : 'var(--accent)'};">
                    ${booking.status === 'confirmed' ? '✅ Confirmed' : '⚡ Pending Approval'}
                </span>
            </div>
            <div class="receipt-row receipt-total">
                <span class="label">Paid Amount:</span>
                <span class="value">₹${booking.packagePrice}</span>
            </div>
        `;
    }

    if (closeReceiptBtn) {
        closeReceiptBtn.addEventListener('click', () => {
            receiptModal.classList.remove('open');
        });
    }

    // Direct PDF Invoice Generation (Formatted browser print or text downloader backup)
    if (downloadReceiptBtn) {
        downloadReceiptBtn.addEventListener('click', () => {
            if (!currentBookingData) return;
            
            const receiptText = `
========================================
             AURA FILMS RECEIPT
========================================
Receipt ID:     ${currentBookingData.id}
Client:         ${currentBookingData.clientName}
Phone:          ${currentBookingData.clientPhone}
Email:          ${currentBookingData.clientEmail}
Date of Shoot:  ${currentBookingData.date}
Slot:           ${currentBookingData.slotLabel}
Service:        ${currentBookingData.packageName}
Price Paid:     INR ${currentBookingData.packagePrice}
Gateway Method: ${currentBookingData.paymentMethod}
Reference/UTR:  ${currentBookingData.transactionRef}
Status:         ${currentBookingData.status.toUpperCase()}
Timestamp:      ${currentBookingData.bookingTime}
========================================
Thank you for booking with Aura Films!
Shoot on iPhone | Delivered Instantly
            `;

            // Trigger direct TXT invoice download
            const blob = new Blob([receiptText], { type: 'text/plain' });
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = `AuraFilms_Invoice_${currentBookingData.id}.txt`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        });
    }

    // ---------------------------------------------------------
    // 9. Admin Console Controller (Dashboard Panel)
    // ---------------------------------------------------------
    const adminGearBtn = document.getElementById('admin-gear-btn');
    const adminModal = document.getElementById('admin-modal');
    const closeAdminModalBtn = document.getElementById('close-admin-modal');
    const adminLoginView = document.getElementById('admin-login-view');
    const adminMainView = document.getElementById('admin-main-view');
    
    const adminPassInput = document.getElementById('admin-pass');
    const adminLoginBtn = document.getElementById('admin-login-btn');
    const adminLogoutBtn = document.getElementById('admin-logout-btn');

    // Dashboard tabs
    const dashTabBtns = document.querySelectorAll('.dash-tab-btn');
    const dashPanels = document.querySelectorAll('.dash-panel');

    // Tab 1: Bookings references
    const bookingsTbody = document.getElementById('admin-bookings-tbody');
    const clearBookingsBtn = document.getElementById('clear-bookings-btn');

    // Tab 2: Portfolio references
    const addWorkForm = document.getElementById('add-work-form');
    const adminPortfolioList = document.getElementById('admin-portfolio-list');

    // Tab 3: Configuration references
    const adminSettingsForm = document.getElementById('admin-settings-form');
    const settingUpiId = document.getElementById('setting-upi-id');
    const settingUpiName = document.getElementById('setting-upi-name');
    const settingWhatsappNum = document.getElementById('setting-whatsapp-num');
    const settingWhatsappMsg = document.getElementById('setting-whatsapp-msg');
    const settingInstagramUrl = document.getElementById('setting-instagram-url');
    const settingEmailAddress = document.getElementById('setting-email-address');
    const settingsPackagesContainer = document.getElementById('settings-packages-container');
    const settingAdminPass = document.getElementById('setting-admin-pass');

    // open admin gateway
    if (adminGearBtn) {
        adminGearBtn.addEventListener('click', () => {
            if (adminPassInput) adminPassInput.value = '';
            if (adminLoginView) adminLoginView.style.display = 'block';
            if (adminMainView) adminMainView.style.display = 'none';
            if (adminModal) adminModal.classList.add('open');
        });
    }

    if (closeAdminModalBtn) {
        closeAdminModalBtn.addEventListener('click', () => {
            adminModal.classList.remove('open');
        });
    }

    // login submit
    if (adminLoginBtn) {
        adminLoginBtn.addEventListener('click', () => {
            const entered = adminPassInput.value;
            const settings = getSettings();

            if (entered === settings.adminPass) {
                adminLoginView.style.display = 'none';
                adminMainView.style.display = 'block';
                // Trigger dashboard draws
                drawAdminDashboard();
            } else {
                alert('Invalid dashboard credentials. Please try again.');
            }
        });
    }

    if (adminLogoutBtn) {
        adminLogoutBtn.addEventListener('click', () => {
            adminLoginView.style.display = 'block';
            adminMainView.style.display = 'none';
        });
    }

    // dashboard tabs toggling
    dashTabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            dashTabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const dashName = btn.getAttribute('data-dash');
            dashPanels.forEach(p => {
                if (p.id === `dash-${dashName}-panel`) {
                    p.classList.add('active');
                } else {
                    p.classList.remove('active');
                }
            });
        });
    });

    // ---------------------------------------------------------
    // Admin Dashboard Render & Actions
    // ---------------------------------------------------------
    function drawAdminDashboard() {
        drawBookingsTable();
        drawAdminPortfolioList();
        loadSettingsForm();
    }

    // 9A. BOOKINGS MANAGER
    function drawBookingsTable() {
        if (!bookingsTbody) return;
        const bookings = getBookings();
        bookingsTbody.innerHTML = '';

        if (bookings.length === 0) {
            bookingsTbody.innerHTML = `<tr><td colspan="6" style="text-align: center; color: var(--text-muted); padding: 3rem;">No bookings received yet.</td></tr>`;
            return;
        }

        // Sort: newest first
        const sortedBookings = [...bookings].reverse();

        sortedBookings.forEach(b => {
            const tr = document.createElement('tr');
            
            // Client Cell
            const clientCell = `
                <div>
                    <span class="client-name-cell">${b.clientName}</span>
                    <div class="client-contact-cell">${b.clientPhone}<br>${b.clientEmail}</div>
                </div>
            `;

            // Date / Slot Cell
            const slotCell = `
                <div>
                    <span class="slot-date-cell">${b.date}</span>
                    <div class="slot-time-cell">${b.slotLabel}</div>
                </div>
            `;

            // Package price Cell
            const pkgCell = `
                <div>
                    <div style="font-weight:600;">${b.packageName}</div>
                    <span class="package-price-cell">₹${b.packagePrice}</span>
                </div>
            `;

            // Payment details Cell
            const payCell = `
                <div>
                    <div>${b.paymentMethod}</div>
                    <span class="payment-ref-cell">${b.transactionRef || 'N/A'}</span>
                </div>
            `;

            // Status Cell
            const statusBadge = `<span class="status-badge ${b.status}">${b.status}</span>`;

            // Actions Cell
            let actionBtn = '';
            if (b.status === 'pending') {
                actionBtn = `<button class="btn btn-primary btn-small approve-btn" data-id="${b.id}"><i data-lucide="check"></i> Approve</button>`;
            }
            const deleteBtn = `<button class="btn btn-outline btn-small delete-booking-btn" data-id="${b.id}" style="color:var(--error); border-color:rgba(255,59,48,0.2);"><i data-lucide="trash-2"></i></button>`;

            tr.innerHTML = `
                <td>${clientCell}</td>
                <td>${slotCell}</td>
                <td>${pkgCell}</td>
                <td>${payCell}</td>
                <td>${statusBadge}</td>
                <td style="display:flex; gap:0.5rem; align-items:center;">${actionBtn} ${deleteBtn}</td>
            `;

            // Approve hook
            const appBtn = tr.querySelector('.approve-btn');
            if (appBtn) {
                appBtn.addEventListener('click', () => {
                    approveBooking(b.id);
                });
            }

            // Delete hook
            tr.querySelector('.delete-booking-btn').addEventListener('click', () => {
                if (confirm('Are you sure you want to delete this booking?')) {
                    deleteBooking(b.id);
                }
            });

            bookingsTbody.appendChild(tr);
        });

        lucide.createIcons();
    }

    function approveBooking(id) {
        const bookings = getBookings();
        const bIdx = bookings.findIndex(b => b.id === id);
        if (bIdx > -1) {
            bookings[bIdx].status = 'confirmed';
            saveBookings(bookings);
            drawBookingsTable();
        }
    }

    function deleteBooking(id) {
        const bookings = getBookings();
        const filtered = bookings.filter(b => b.id !== id);
        saveBookings(filtered);
        drawBookingsTable();

        // Refresh slots grid in page background
        const dateChangeEvent = new Event('change');
        if (bookingDateInput) {
            bookingDateInput.dispatchEvent(dateChangeEvent);
        }
    }

    if (clearBookingsBtn) {
        clearBookingsBtn.addEventListener('click', () => {
            if (confirm('CAUTION: Are you sure you want to clear ALL bookings? This cannot be undone.')) {
                saveBookings([]);
                drawBookingsTable();
                
                // Refresh slots grid
                const dateChangeEvent = new Event('change');
                if (bookingDateInput) {
                    bookingDateInput.dispatchEvent(dateChangeEvent);
                }
            }
        });
    }

    // 9B. PORTFOLIO ITEMS MANAGER
    function drawAdminPortfolioList() {
        if (!adminPortfolioList) return;
        const portfolio = getPortfolio();
        adminPortfolioList.innerHTML = '';

        portfolio.forEach(item => {
            const row = document.createElement('div');
            row.className = 'admin-item-row';
            
            row.innerHTML = `
                <img class="admin-item-thumb" src="${item.imgUrl}" alt="${item.title}">
                <div class="admin-item-details">
                    <div class="admin-item-title">${item.title}</div>
                    <div class="admin-item-meta">${item.type.toUpperCase()} • ${item.category}</div>
                </div>
                <button class="admin-item-delete" data-id="${item.id}">
                    <i data-lucide="trash-2"></i>
                </button>
            `;

            row.querySelector('.admin-item-delete').addEventListener('click', () => {
                if (confirm(`Remove "${item.title}" from the visual portfolio grid?`)) {
                    removePortfolioItem(item.id);
                }
            });

            adminPortfolioList.appendChild(row);
        });

        lucide.createIcons();
    }

    // Form showing or hiding YouTube embedding hint
    const workTypeSelect = document.getElementById('work-type');
    const videoSourceGroup = document.getElementById('video-source-group');
    if (workTypeSelect && videoSourceGroup) {
        workTypeSelect.addEventListener('change', () => {
            if (workTypeSelect.value === 'video') {
                videoSourceGroup.style.display = 'block';
            } else {
                videoSourceGroup.style.display = 'none';
            }
        });
    }

    if (addWorkForm) {
        addWorkForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const title = document.getElementById('work-title').value.trim();
            const type = document.getElementById('work-type').value;
            const category = document.getElementById('work-category').value.trim();
            const imgUrl = document.getElementById('work-url').value.trim();
            let videoUrl = '';

            if (type === 'video') {
                videoUrl = document.getElementById('work-video-url').value.trim();
            }

            const aspect = document.getElementById('work-aspect').value;

            const newItem = {
                id: 'item-' + Date.now(),
                title,
                type,
                category,
                aspect,
                imgUrl,
                videoUrl
            };

            const portfolio = getPortfolio();
            portfolio.push(newItem);
            savePortfolio(portfolio);

            // Redraws
            addWorkForm.reset();
            if (videoSourceGroup && workTypeSelect) {
                videoSourceGroup.style.display = 'block'; // reset default video embed display
            }
            drawAdminPortfolioList();
            renderPortfolio();
            alert('New work added successfully and rendered to the Visual Grid.');
        });
    }

    function removePortfolioItem(id) {
        const portfolio = getPortfolio();
        const filtered = portfolio.filter(item => item.id !== id);
        savePortfolio(filtered);
        
        drawAdminPortfolioList();
        renderPortfolio();
    }

    // 9C. CONFIGURATION MANAGER
    function loadSettingsForm() {
        if (!adminSettingsForm) return;
        const settings = getSettings();

        settingUpiId.value = settings.upiId;
        settingUpiName.value = settings.upiName;
        settingWhatsappNum.value = settings.whatsappNum;
        settingWhatsappMsg.value = settings.whatsappMsg;
        settingInstagramUrl.value = settings.instagramUrl;
        settingEmailAddress.value = settings.emailAddress;
        settingAdminPass.value = ''; // leave empty for security prompt

        // Populate Packages pricing rates editor
        if (settingsPackagesContainer) {
            settingsPackagesContainer.innerHTML = '';
            
            settings.packages.forEach((pkg, index) => {
                const row = document.createElement('div');
                row.className = 'package-config-row';
                row.innerHTML = `
                    <h4>${pkg.name}</h4>
                    <div class="input-group" style="margin-bottom:0.5rem;">
                        <label class="input-label">Rate Price (₹)</label>
                        <input type="number" class="form-input pkg-price-input" data-idx="${index}" value="${pkg.price}" style="padding-left:1rem;" required>
                    </div>
                    <div class="input-group" style="margin-bottom:0;">
                        <label class="input-label">Description</label>
                        <input type="text" class="form-input pkg-desc-input" data-idx="${index}" value="${pkg.description}" style="padding-left:1rem;" required>
                    </div>
                `;
                settingsPackagesContainer.appendChild(row);
            });
        }
    }

    if (adminSettingsForm) {
        adminSettingsForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const settings = getSettings();

            // Bind top forms
            settings.upiId = settingUpiId.value.trim();
            settings.upiName = settingUpiName.value.trim();
            settings.whatsappNum = settingWhatsappNum.value.trim();
            settings.whatsappMsg = settingWhatsappMsg.value.trim();
            settings.instagramUrl = settingInstagramUrl.value.trim();
            settings.emailAddress = settingEmailAddress.value.trim();

            // Bind package updates
            const priceInputs = settingsPackagesContainer.querySelectorAll('.pkg-price-input');
            const descInputs = settingsPackagesContainer.querySelectorAll('.pkg-desc-input');

            priceInputs.forEach(input => {
                const idx = parseInt(input.getAttribute('data-idx'));
                settings.packages[idx].price = parseFloat(input.value);
            });

            descInputs.forEach(input => {
                const idx = parseInt(input.getAttribute('data-idx'));
                settings.packages[idx].description = input.value;
            });

            // Bind password change if provided
            const newPass = settingAdminPass.value.trim();
            if (newPass) {
                settings.adminPass = newPass;
            }

            // Save Settings
            saveSettings(settings);

            // Trigger updates on page UI
            reloadRedirects();
            populateBookingPackages();
            
            alert('Global configurations saved successfully. Redirect links, pricing grids, and UPI parameters have been updated.');
            settingAdminPass.value = '';
        });
    }

    // ---------------------------------------------------------
    // 10. Scroll Observer Animations Reveal
    // ---------------------------------------------------------
    const revealElements = document.querySelectorAll('.workflow-card, .booking-card, .connect-card');
    
    if ('IntersectionObserver' in window) {
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1
        });

        revealElements.forEach(el => {
            // Initial transition states
            el.style.opacity = '0';
            el.style.transform = 'translateY(40px)';
            el.style.transition = 'opacity 0.8s ease, transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
            revealObserver.observe(el);
        });
    } else {
        revealElements.forEach(el => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        });
    }

    // ---------------------------------------------------------
    // Join Aura Films Modal Logic
    // ---------------------------------------------------------
    const joinTeamBtn = document.getElementById('join-team-btn');
    const joinModal = document.getElementById('join-modal');
    const closeJoinModalBtn = document.getElementById('close-join-modal');
    const joinForm = document.getElementById('join-form');

    if (joinTeamBtn && joinModal) {
        joinTeamBtn.addEventListener('click', () => {
            // Close mobile menu if open
            const navMenu = document.getElementById('nav-menu');
            if (navMenu && navMenu.classList.contains('open')) {
                navMenu.classList.remove('open');
            }
            joinModal.classList.add('open');
            if (window.lucide) window.lucide.createIcons();
        });
    }

    if (closeJoinModalBtn && joinModal) {
        closeJoinModalBtn.addEventListener('click', () => {
            joinModal.classList.remove('open');
        });
    }

    if (joinModal) {
        joinModal.addEventListener('click', (e) => {
            if (e.target === joinModal) {
                joinModal.classList.remove('open');
            }
        });
    }

    if (joinForm) {
        joinForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const settings = getSettings();
            const name = document.getElementById('join-name').value.trim();
            const phone = document.getElementById('join-phone').value.trim();
            const email = document.getElementById('join-email').value.trim();
            const device = document.getElementById('join-device').value.trim();
            const portfolio = document.getElementById('join-portfolio').value.trim();

            // Construct email details
            const subject = `Application to Join Aura Films - ${name}`;
            const body = `Hi Aura Films,\n\nA new creative has applied to join Aura Films. Here are their application details:\n\n` +
                          `Name: ${name}\n` +
                          `Phone: ${phone}\n` +
                          `Email: ${email}\n` +
                          `Device: ${device}\n` +
                          `Portfolio/Work: ${portfolio}\n\nPlease review their details and portfolio link.`;

            const mailtoUrl = `mailto:${settings.emailAddress}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

            // Redirect to Mail client
            window.location.href = mailtoUrl;

            // Close modal & reset form
            joinForm.reset();
            joinModal.classList.remove('open');
        });
    }

});
