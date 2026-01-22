document.addEventListener('DOMContentLoaded', () => {
    // Navbar Scroll Animation
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Mobile Navigation Toggle (placeholder if needed in future)

    // Smooth Scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            if (this.hash !== "") {
                e.preventDefault();
                const target = document.querySelector(this.hash);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Shop Page Filtering - Dual Filter Logic
    const categoryDropdown = document.getElementById('category-dropdown');
    const priceDropdown = document.getElementById('price-dropdown');
    const productCards = document.querySelectorAll('.shop-grid .product-card');

    if (categoryDropdown && priceDropdown) {
        let currentCategory = 'all';
        let currentPriceRange = 'all';

        const setupDropdown = (dropdown, updateCallback) => {
            const selected = dropdown.querySelector('.dropdown-selected');
            const options = dropdown.querySelectorAll('.dropdown-option');

            selected.addEventListener('click', (e) => {
                e.stopPropagation();
                // Close other dropdowns first
                document.querySelectorAll('.custom-dropdown').forEach(d => {
                    if (d !== dropdown) d.classList.remove('open');
                });
                dropdown.classList.toggle('open');
            });

            options.forEach(option => {
                option.addEventListener('click', () => {
                    const value = option.getAttribute('data-value');
                    const label = option.innerText;
                    selected.innerText = label;
                    dropdown.classList.remove('open');
                    updateCallback(value);
                });
            });
        };

        const filterProducts = () => {
            productCards.forEach(card => {
                const category = card.getAttribute('data-category');
                const price = parseInt(card.getAttribute('data-price'));

                let categoryMatch = (currentCategory === 'all' || category === currentCategory);
                let priceMatch = false;

                if (currentPriceRange === 'all') {
                    priceMatch = true;
                } else if (currentPriceRange === 'under-500') {
                    priceMatch = price < 500;
                } else if (currentPriceRange === '500-1000') {
                    priceMatch = price >= 500 && price <= 1000;
                } else if (currentPriceRange === 'over-1000') {
                    priceMatch = price > 1000;
                }

                if (categoryMatch && priceMatch) {
                    card.style.display = 'block';
                    card.style.animation = 'none';
                    card.offsetHeight;
                    card.style.animation = 'fadeIn 0.5s ease forwards';
                } else {
                    card.style.display = 'none';
                }
            });
        };

        setupDropdown(categoryDropdown, (val) => {
            currentCategory = val;
            filterProducts();
        });

        setupDropdown(priceDropdown, (val) => {
            currentPriceRange = val;
            filterProducts();
        });

        // Global click listener to close dropdowns
        document.addEventListener('click', () => {
            document.querySelectorAll('.custom-dropdown').forEach(d => d.classList.remove('open'));
        });
    }

    // Product Details Logic
    const PRODUCT_DATA = {
        'rose-bouquet': {
            name: "Blushing Rose Bouquet",
            price: 'Rs. 1800', // Base price or range can be displayed initially
            category: 'Flowers',
            image: 'images/rose-bouquet.png',
            description: "Handcrafted crochet roses that never wilt, keeping your memories fresh forever.",
            features: ['Handcrafted with premium yarn', 'Customizable bouquet size', 'Everlasting bloom', 'Available in various colors'],
            dynamicPricing: true,
            basePriceSmall: 350, // Per flower if qty <= 3
            basePriceLarge: 300, // Per flower if qty > 3
            defaultQty: 6 // Example default
        },
        'blush-coaster': {
            name: "The Bibilophile's Bloom",
            price: 'Rs. 400',
            category: 'Home Decor',
            image: 'images/bibilophile-bloom.jpg',
            description: "A delicate floral companion for your reading adventures. The Bibilophile's Bloom adds a touch of handmade elegance to your favorite books.",
            features: ['Handcrafted floral design', 'Soft cotton yarn', 'Ideal for bookmarks or decor', 'Available in multiple shades']
        },
        'ghost-keychain': {
            name: "Ghostly Charm Keychain",
            price: 'Rs. 300',
            category: 'Accessories',
            image: 'images/ghost-plush.jpg',
            description: "A friendly little spirit to accompany you wherever you go. This handmade crochet ghost features a cute pink bow and a sturdy keychain attachment.",
            features: ['Hand-stitched with love', 'Soft acrylic yarn', 'Cute pink bow detail', 'Sturdy metal keychain']
        },
        'batman-keychain': {
            name: "Dark Knight Buddy",
            price: 'Rs. 750',
            category: 'Accessories',
            image: 'images/batman-buddy.jpg',
            description: "The protector your room deserves. This hand-crocheted Dark Knight Buddy amigurumi features intricate details like the iconic bat symbol and a flowing cape.",
            features: ['Iconic hand-stitched details', 'Durable keychain ring', 'Soft cotton-poly blend', 'Action-ready design']
        },
        'berry-cardigan': {
            name: 'Cozy Berry Cardigan',
            price: 'Rs. 2500',
            category: 'Wearables',
            image: 'images/berry-cardigan.png',
            description: 'Wrap yourself in the warmth of our Cozy Berry Cardigan. Hand-knit with chunky, soft yarn in a delightful berry hue.',
            features: ['Chunky knit texture', 'Warm and breathable', 'Oversized comfort fit', 'Wooden button details'],
            dynamicPricing: true,
            pricingType: 'size',
            prices: {
                'Small': 6000,
                'Medium': 7500,
                'Large': 9000
            }
        },
        'mini-whale': {
            name: 'Ocean Blue Whale',
            price: 'Rs. 400',
            category: 'Plushies',
            image: 'images/blue-whale.png',
            description: 'A tiny companion for big adventures! This pocket-sized whale is soft, squishy, and absolutely adorable.',
            features: ['Pocket-sized (4 inches)', 'Soft velvet yarn', 'Perfect for keychains or desks', 'Handmade with care']
        },
        'bumble-bee': {
            name: 'Bumble Bee Buddy',
            price: 'Rs. 750',
            category: 'Plushies',
            image: 'images/bumble-bee.png',
            description: 'Buzzing with cuteness! This little bee is the perfect shelf companion or gift for someone sweet.',
            features: ['Soft plush yarn', 'Detailed stripes', 'Cute wings', 'Handcrafted with love']
        },
        'sleepy-sloth': {
            name: 'Sleepy Sloth Plush',
            price: 'Rs. 1300',
            category: 'Plushies',
            image: 'images/sleepy-sloth.png',
            description: 'Take it slow with this ultra-soft sleepy sloth. Designed for relaxation and cuddles.',
            features: ['Extra soft texture', 'Large huggable size', 'Durable stitching', 'Adorable expression']
        },
        'matcha-dino': {
            name: 'Matcha Dino Friend',
            price: 'Rs. 600',
            category: 'Plushies',
            image: 'images/matcha-dino.png',
            description: 'A prehistoric pal in a soothing matcha green. This little dinosaur is ready for any adventure.',
            features: ['Vibrant matcha green', 'Safe for all ages', 'Soft cotton blend', 'Uniquely handmade']
        },
        'sunny-duckling': {
            name: 'Sunny Duckling Plush',
            price: 'Rs. 750',
            category: 'Plushies',
            image: 'images/sunny-duckling.png',
            description: 'Brighten your day with this cheerful sunny duckling. Soft, yellow, and absolutely precious.',
            features: ['Bright yellow yarn', 'Squishy and soft', 'Perfect nursery decor', 'Handmade quality']
        },
        'galaxy-cat': {
            name: 'The Galaxy Cat',
            price: 'Rs. 750',
            category: 'Plushies',
            image: 'images/galaxy-cat.png',
            description: 'A cosmic kitty from beyond the stars. This galaxy-themed cat is out of this world!',
            features: ['Unique color pattern', 'Soft velvet feel', 'Sturdy construction', 'Mystical design']
        },
        'flower-keychain': {
            name: 'Lily Flower',
            price: 'Rs. 800',
            category: 'Flowers',
            image: 'images/lily-keychain.jpg',
            description: 'A stunning handcrafted red lily flower with vibrant petals. This everlasting bloom adds a touch of elegance to any space.',
            features: ['Vibrant red petals', 'Hand-crocheted details', 'Never wilts', 'Great for gifting']
        },
        'midnight-muffler': {
            name: "Midnight Comfort Muffler",
            price: 'Rs. 2500',
            category: 'Wearables',
            image: 'images/comfort-muffler.jpg',
            description: "Stay cozy and stylish with this handmade muffler. Perfect for chilly evenings, this soft and durable accessory adds a touch of elegance to any outfit.",
            features: ['Soft and warm yarn', 'Classic dimensions', 'Hand-knitted pattern', 'Machine washable'],
            dynamicPricing: true,
            pricingType: 'size',
            prices: {
                '50x6 inches': 2500,
                '67x6 inches': 3500,
                '78x6 inches': 4500
            }
        },
        'ruffled-scrunchies': {
            name: "Ruffled Bloom Scrunchies",
            price: 'Rs. 250',
            category: 'Accessories',
            image: 'images/ruffle-scrunchies.jpg',
            description: "Add a pop of color and charm to your hairstyle with these handmadeuffled scrunchies. Soft on hair and stylish to wear.",
            features: ['Soft yarn to prevent breakage', 'Available in single & multicolor', 'Durable elastic', 'Hand-crocheted ruffles'],
            dynamicPricing: true,
            pricingType: 'variant',
            optionLabel: 'Color Style',
            prices: {
                'Single Color': 250,
                'Multicolor': 350
            }
        },
        'snowy-bunny': {
            name: "Snowy Bow Bunny",
            price: 'Rs. 1500',
            category: 'Plushies',
            image: 'images/snowy-bunny.jpg',
            description: "A soft and huggable bunny friend with a cute bow. Perfect for cuddling or as a charming nursery decoration.",
            features: ['Ultra-soft yarn', 'Safety eyes used', 'Durable stitching', 'Washable material'],
            dynamicPricing: true,
            pricingType: 'size',
            prices: {
                'Small': 1500,
                'Large': 2000
            }
        },
        'strawberry-plush': {
            name: "Strawberry Fields Plush",
            price: 'Rs. 1500',
            category: 'Plushies',
            image: 'images/strawberry-plush.png',
            description: "A sweet and soft strawberry plushie, perfect for hugging. Handcrafted with vibrant colors and durable yarn.",
            features: ['Vibrant colors', 'Soft and squishy filler', 'Hand-stitched seeds', 'Perfect gift item'],
            dynamicPricing: true,
            pricingType: 'size',
            prices: {
                'Small': 1500,
                'Large': 2000
            }
        },
        'sunflower-coaster': {
            name: "Sunflower Coaster Set",
            price: 'Rs. 500',
            category: 'Home Decor',
            image: 'images/sunflower-coasters.png',
            description: "Brighten up your table with this cheerful set of 5 sunflower coasters. Hand-crocheted with durable cotton yarn to protect your surfaces in style.",
            features: ['Set of 5 coasters', '100% Cotton yarn', 'Absorbent and washable', 'Bright sunflower design'],
            dynamicPricing: false
        },
        'pastel-beanie': {
            name: "Pastel Pink Beanie",
            price: 'Rs. 1100',
            category: 'Wearables',
            image: 'images/pink-beanie.jpg',
            description: "Stay warm and stylish with this soft pastel pink beanie. Hand-knitted with premium wool blend for maximum comfort and warmth.",
            features: ['Soft pink color', 'Premium wool blend', 'One size fits most', 'Hand wash recommended'],
            dynamicPricing: false
        },
        'ruby-bow': {
            name: "Ruby Red Bow Clip",
            price: 'Rs. 400',
            category: 'Accessories',
            image: 'images/red-bow-clip.jpg',
            description: "Add a statement pop of red to your hair with this oversized ruby bow clip. Handcrafted for a sturdy grip and beautiful drape.",
            features: ['Oversized design', 'Sturdy metal clip', 'Vibrant red yarn', 'Perfect for special occasions'],
            dynamicPricing: false
        },
        'baby-booties': {
            name: "Baby Bloom Booties",
            price: 'Rs. 400',
            category: 'Wearables',
            image: 'images/baby-booties.png',
            description: "Keep little feet cozy and cute with these handmade baby booties. Soft yarn ensures comfort for delicate skin.",
            features: ['Soft and gentle yarn', 'Adorable flower detail', 'Perfect for newborns', 'Warm and breathable'],
            dynamicPricing: false
        },
        'heart-pillows': {
            name: "Cozy Heart Pillows (Pair)",
            price: 'Rs. 2500',
            category: 'Home Decor',
            image: 'images/heart-pillows.jpg',
            description: "Add warmth and charm to any space with this adorable pair of heart-shaped pillows. Perfect for sofas, beds, or as romantic decor.",
            features: ['Sold as a pair', 'Soft polyester filling', 'Durable crochet cover', 'Perfect for gifting'],
            dynamicPricing: false
        },
        'tulip-desk': {
            name: "Blushing Tulip Desk Set",
            price: 'Rs. 800',
            category: 'Flowers',
            image: 'images/tulip-set.png',
            description: "Brighten your workspace with this charming set of handcrafted tulips. Perfect for adding a touch of nature to any desk or shelf.",
            features: ['Handcrafted tulip blooms', 'Soft cotton yarn', 'Long-lasting beauty', 'Ideal desk companion'],
            dynamicPricing: false
        },
        'sunflower-bouquet': {
            name: "Sunshine Sunflower Bouquet",
            price: 'Rs. 1300',
            category: 'Flowers',
            image: 'images/sunflower-bouquet.png',
            description: "Brighten any room with this cheerful sunflower bouquet. Hand-crocheted with vibrant yellow yarn to bring sunshine indoors.",
            features: ['Bright and cheerful', 'Never wilts', 'Hand-crocheted petals', 'Perfect centerpiece'],
            dynamicPricing: false
        },
        'lavender-pot': {
            name: "Lavender Dream Pot",
            price: 'Rs. 600',
            category: 'Flowers',
            image: 'images/lavender-pot.jpg',
            description: "A delicate lavender plant in a decorative pot. This handcrafted piece brings calming vibes and a touch of purple beauty to any space.",
            features: ['Soft purple blooms', 'Decorative pot included', 'Hand-crocheted details', 'Never needs watering'],
            dynamicPricing: false
        },
        'pink-peony': {
            name: "Regal Pink Peony",
            price: 'Rs. 700',
            category: 'Flowers',
            image: 'images/peony-display.jpg',
            description: "A majestic pink peony bloom that captures elegance and grace. This handcrafted flower brings a royal touch to any setting.",
            features: ['Lush pink petals', 'Intricate detailing', 'Never fades', 'Perfect statement piece'],
            dynamicPricing: false
        },
        'jasmine-stem': {
            name: "White Jasmine Stem",
            price: 'Rs. 700',
            category: 'Flowers',
            image: 'images/jasmine-stem.png',
            description: "A delicate white jasmine stem with pristine blooms. This elegant piece brings purity and fragrance-inspired beauty to your space.",
            features: ['Pure white blooms', 'Delicate stem design', 'Hand-crocheted', 'Timeless elegance'],
            dynamicPricing: false
        },
        'hydrangea-cluster': {
            name: "Blue Hydrangea Cluster",
            price: 'Rs. 700',
            category: 'Flowers',
            image: 'images/hydrangea-cluster.jpg',
            description: "A stunning cluster of blue hydrangea blooms. This handcrafted arrangement brings a touch of garden beauty indoors.",
            features: ['Rich blue color', 'Clustered bloom design', 'Everlasting beauty', 'Perfect for display'],
            dynamicPricing: false
        },
        'orchid-bloom': {
            name: "Orchid Desk Bloom",
            price: 'Rs. 700',
            category: 'Flowers',
            image: 'images/orchids.png',
            description: "An exotic orchid bloom perfect for your desk or shelf. This handcrafted flower adds sophistication and elegance to any workspace.",
            features: ['Exotic orchid design', 'Sophisticated look', 'Never wilts', 'Ideal for desks'],
            dynamicPricing: false
        }
    };

    const productDetailContainer = document.getElementById('product-detail-page');
    if (productDetailContainer) {
        const urlParams = new URLSearchParams(window.location.search);
        const productId = urlParams.get('id');
        const product = PRODUCT_DATA[productId];

        if (product) {
            document.getElementById('p-name').innerText = product.name;
            document.getElementById('p-price').innerText = product.price;
            document.getElementById('p-category').innerText = product.category;
            document.getElementById('p-description').innerText = product.description;

            // Handle Image
            const imgElement = document.getElementById('p-main-img');
            if (product.image) {
                imgElement.src = product.image;
                imgElement.alt = product.name;
                imgElement.style.display = 'block';
                document.getElementById('p-img-placeholder').style.display = 'none';
            } else {
                imgElement.style.display = 'none';
                document.getElementById('p-img-placeholder').style.display = 'block';
            }

            const featuresList = document.getElementById('p-features');
            featuresList.innerHTML = '';
            product.features.forEach(feature => {
                const li = document.createElement('li');
                li.innerText = feature;
                featuresList.appendChild(li);
            });

            // Set dynamic page title
            document.title = `${product.name} | Bloomy Hook`;

            // Update Order Button
            const pOrderBtn = document.getElementById('p-order-btn');
            if (pOrderBtn) {
                const message = encodeURIComponent(`Hi! I'm interested in ordering the ${product.name}.`);
                pOrderBtn.href = `https://wa.me/923350298926?text=${message}`;
            }
        } else {
            // Handle product not found
            productDetailContainer.innerHTML = `
                <div class="container" style="text-align: center; padding: 100px 0;">
                    <h1>Oops! Product Not Found</h1>
                    <p>We couldn't find the treasure you're looking for.</p>
                    <a href="shop.html" class="btn" style="margin-top: 20px;">Return to Shop</a>
                </div>
            `;
        }
    }

    // Scroll Observer for Animations
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.scroll-animate').forEach(el => {
        observer.observe(el);
    });

    // Product Modal Logic
    const modal = document.getElementById('product-modal');
    const closeModalBtn = document.querySelector('.close-modal');
    const viewDetailsBtns = document.querySelectorAll('.btn-outline');

    const openModal = (productInfo) => {
        const modalImg = document.getElementById('modal-img');
        const modalTitle = document.getElementById('modal-title');
        const modalCategory = document.getElementById('modal-category');
        const modalPrice = document.getElementById('modal-price');
        const modalDesc = document.getElementById('modal-desc');

        modalImg.src = productInfo.image;
        modalImg.alt = productInfo.name;
        modalTitle.innerText = productInfo.name;
        modalCategory.innerText = productInfo.category;

        // Reset dynamic content
        const existingDynamic = modal.querySelector('.dynamic-pricing-container');
        if (existingDynamic) existingDynamic.remove();

        if (productInfo.dynamicPricing) {
            // Dynamic Pricing Logic
            if (productInfo.pricingType === 'size') {
                // Size-based Pricing
                modalPrice.innerText = `Rs. ${productInfo.prices['Small']}`;

                const dynamicContainer = document.createElement('div');
                dynamicContainer.className = 'dynamic-pricing-container';
                dynamicContainer.style.marginTop = '1rem';
                dynamicContainer.innerHTML = `
                    <label style="display:block; margin-bottom:0.5rem; font-weight:600; color:var(--text-deep);">Select Size:</label>
                    <div style="display:flex; gap:1rem; flex-wrap:wrap;">
                        ${Object.keys(productInfo.prices).map(size => `
                            <label style="cursor:pointer; display:flex; align-items:center; gap:0.5rem; font-size:0.95rem;">
                                <input type="radio" name="size-select" value="${size}" ${size === 'Small' ? 'checked' : ''} style="accent-color:var(--accent-gold);">
                                ${size}
                            </label>
                        `).join('')}
                    </div>
                    <p id="size-price-display" style="font-weight:700; color:var(--accent-gold); font-size:1.2rem; margin-top:0.8rem;">
                        Total: Rs. ${productInfo.prices['Small']}
                    </p>
                `;

                modalPrice.parentNode.insertBefore(dynamicContainer, modalPrice.nextSibling);

                const sizeInputs = dynamicContainer.querySelectorAll('input[name="size-select"]');
                const priceDisplay = dynamicContainer.querySelector('#size-price-display');

                sizeInputs.forEach(input => {
                    input.addEventListener('change', (e) => {
                        const size = e.target.value;
                        const newPrice = productInfo.prices[size];
                        priceDisplay.innerText = `Total: Rs. ${newPrice}`;
                    });
                });

                modalPrice.style.display = 'none';

            } else if (productInfo.pricingType === 'variant') {
                // Variant-based Pricing (e.g. Scunchies Color)
                const firstOption = Object.keys(productInfo.prices)[0];
                modalPrice.innerText = `Rs. ${productInfo.prices[firstOption]}`;

                const dynamicContainer = document.createElement('div');
                dynamicContainer.className = 'dynamic-pricing-container';
                dynamicContainer.style.marginTop = '1rem';
                dynamicContainer.innerHTML = `
                    <label style="display:block; margin-bottom:0.5rem; font-weight:600; color:var(--text-deep);">${productInfo.optionLabel || 'Select Type'}:</label>
                    <div style="display:flex; gap:1rem; flex-wrap:wrap;">
                        ${Object.keys(productInfo.prices).map(option => `
                            <label style="cursor:pointer; display:flex; align-items:center; gap:0.5rem; font-size:0.95rem;">
                                <input type="radio" name="variant-select" value="${option}" ${option === firstOption ? 'checked' : ''} style="accent-color:var(--accent-gold);">
                                ${option}
                            </label>
                        `).join('')}
                    </div>
                    <p id="variant-price-display" style="font-weight:700; color:var(--accent-gold); font-size:1.2rem; margin-top:0.8rem;">
                        Total: Rs. ${productInfo.prices[firstOption]}
                    </p>
                `;

                modalPrice.parentNode.insertBefore(dynamicContainer, modalPrice.nextSibling);

                const variantInputs = dynamicContainer.querySelectorAll('input[name="variant-select"]');
                const priceDisplay = dynamicContainer.querySelector('#variant-price-display');

                variantInputs.forEach(input => {
                    input.addEventListener('change', (e) => {
                        const option = e.target.value;
                        const newPrice = productInfo.prices[option];
                        priceDisplay.innerText = `Total: Rs. ${newPrice}`;
                    });
                });

                modalPrice.style.display = 'none';

            } else {
                // Default / Flower Quantity Logic (Rose Bouquet)
                modalPrice.innerText = `Rs. ${productInfo.price}`;

                const dynamicContainer = document.createElement('div');
                dynamicContainer.className = 'dynamic-pricing-container';
                dynamicContainer.style.marginTop = '1rem';
                dynamicContainer.innerHTML = `
                    <div style="background: rgba(201, 162, 77, 0.05); padding: 0.8rem; border-radius: 12px; border: 1px dashed var(--accent-gold);">
                        <label style="display:block; margin-bottom:0.4rem; font-weight:600; font-size: 0.9rem; color:var(--text-deep);">Number of Flowers:</label>
                        <div style="display:flex; align-items:center; gap:0.8rem;">
                            <input type="number" id="flower-qty" value="1" min="1" style="padding:0.4rem; border:2px solid var(--accent-gold); border-radius:8px; width:70px; font-size:0.95rem;">
                            <span id="calculated-total" style="font-weight:700; color:var(--accent-gold); font-size:1.1rem;">Total: Rs. ${productInfo.basePriceSmall}</span>
                        </div>
                        <p style="font-size:0.8rem; margin-top:0.4rem; color:var(--text-base); opacity:0.8; line-height: 1.2;">
                            Rs. ${productInfo.basePriceSmall}/ea (≤3), Rs. ${productInfo.basePriceLarge}/ea (>3)
                        </p>
                    </div>
                `;

                modalPrice.parentNode.insertBefore(dynamicContainer, modalPrice.nextSibling);

                const qtyInput = dynamicContainer.querySelector('#flower-qty');
                const totalDisplay = dynamicContainer.querySelector('#calculated-total');

                qtyInput.addEventListener('input', (e) => {
                    const qty = parseInt(e.target.value) || 0;
                    let unitPrice = qty > 3 ? productInfo.basePriceLarge : productInfo.basePriceSmall;
                    let total = qty * unitPrice;
                    totalDisplay.innerText = `Total: Rs. ${total}`;
                });

                modalPrice.style.display = 'none';
            }

        } else {
            modalPrice.style.display = 'block';
            modalPrice.innerText = productInfo.price;
        }

        if (productInfo.description) {
            modalDesc.innerText = productInfo.description;
        }

        // Update Order Button
        const orderBtn = document.getElementById('modal-order-btn');
        if (orderBtn) {
            const message = encodeURIComponent(`Hi! I'm interested in ordering the ${productInfo.name}.`);
            orderBtn.href = `https://wa.me/923350298926?text=${message}`;
        }

        modal.classList.add('show');
        document.body.style.overflow = 'hidden'; // Prevent scrolling
    };

    const closeModal = () => {
        modal.classList.remove('show');
        document.body.style.overflow = ''; // Restore scrolling
        // Reset dynamic pricing UI
        const existingDynamic = modal.querySelector('.dynamic-pricing-container');
        if (existingDynamic) existingDynamic.remove();
        document.getElementById('modal-price').style.display = 'block';
    };

    viewDetailsBtns.forEach(btn => {
        if (btn.innerText.includes('View Details')) {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const card = btn.closest('.product-card');
                if (!card) return;

                const productId = btn.getAttribute('href')?.split('=')[1] || '';
                const productFromData = PRODUCT_DATA[productId];

                // If data exists in PRODUCT_DATA, use it (preferred for consistent data)
                // Fallback to scraping card info if not found

                let productInfo;

                if (productFromData) {
                    productInfo = productFromData;
                } else {
                    productInfo = {
                        name: card.querySelector('h3').innerText,
                        price: card.querySelector('.price').innerText,
                        category: (card.getAttribute('data-category') || 'Handmade').split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
                        image: card.querySelector('.product-thumb').src,
                        description: "Handcrafted with love and attention to detail. This unique piece from Bloomy Hook brings warmth and charm to any space or outfit.",
                        dynamicPricing: false // Default to false for scraped cards
                    };
                }

                openModal(productInfo);
            });
        }
    });

    // Inject Order Now buttons to every card if missing
    document.querySelectorAll('.product-card').forEach(card => {
        const titleElement = card.querySelector('h3');
        if (!titleElement) return;

        const title = titleElement.innerText;
        const detailsBtn = card.querySelector('.btn-outline');

        // Only if it doesn't already have a button container we added manually
        if (detailsBtn && !card.querySelector('.product-actions')) {
            const actionsDiv = document.createElement('div');
            actionsDiv.className = 'product-actions';

            // Insert container before detailsBtn
            detailsBtn.parentNode.insertBefore(actionsDiv, detailsBtn);

            // Move detailsBtn inside
            actionsDiv.appendChild(detailsBtn);
            detailsBtn.classList.add('btn-sm');

            // Create Order Now button
            const orderBtn = document.createElement('a');
            orderBtn.className = 'btn order-now-btn btn-sm';
            orderBtn.innerText = 'Order Now';
            orderBtn.target = '_blank';
            const message = encodeURIComponent(`Hi! I want to order the ${title}`);
            orderBtn.href = `https://wa.me/923350298926?text=${message}`;

            actionsDiv.appendChild(orderBtn);
        }
    });

    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', closeModal);
    }

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Handle Escape key to close modal
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('show')) {
            closeModal();
        }
    });
    // Contact Form Submission Handling
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const submitBtn = document.getElementById('form-submit-btn');
            const status = document.getElementById('form-status');
            const formData = new FormData(contactForm);
            const successOverlay = document.getElementById('success-overlay');

            // Optimistic UI: Show success animation immediately for instant gratification
            if (successOverlay) {
                successOverlay.classList.add('show');

                // Reset form and hide overlay after animation finishes
                const timer = setTimeout(() => {
                    successOverlay.classList.remove('show');
                    contactForm.reset();
                }, 5000);

                // Allow clicking to dismiss early
                successOverlay.onclick = () => {
                    clearTimeout(timer);
                    successOverlay.classList.remove('show');
                    contactForm.reset();
                };
            } else {
                // Fallback for pages without the modern overlay
                status.style.display = 'block';
                status.innerText = 'Sharing your love with us...';
                status.style.color = 'var(--text-deep)';
            }

            // Perform the actual network request in the background
            fetch(contactForm.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            }).catch(error => {
                console.error('Form submission error:', error);
                // Silent fail in background to keep UI fast, 
                // but logging for developer debugging.
            });
        });
    }
});

// Add fade in animation to stylesheet dynamically or in CSS
const styleSheet = document.createElement("style");
styleSheet.innerText = `
@keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
}
`;
document.head.appendChild(styleSheet);
