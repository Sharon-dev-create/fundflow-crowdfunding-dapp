<!-- FundFlow Landing Page -->
<!DOCTYPE html><html class="dark" lang="en"><head>
<meta charset="utf-8">
<meta content="width=device-width, initial-scale=1.0" name="viewport">
<title>FundFlow | Decentralized Crowdfunding for Africa</title>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&amp;family=JetBrains+Mono:wght@400;500&amp;display=swap" rel="stylesheet">
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet">
<script id="tailwind-config">
      tailwind.config = {
        darkMode: "class",
        theme: {
          extend: {
            "colors": {
                    "primary-fixed-dim": "#c0c1ff",
                    "tertiary-container": "#009eb9",
                    "surface-container-highest": "#2d3449",
                    "surface-container-lowest": "#060e20",
                    "on-surface-variant": "#c7c4d7",
                    "background": "#0b1326",
                    "on-secondary-fixed": "#002113",
                    "surface-container-low": "#131b2e",
                    "surface": "#0b1326",
                    "surface-variant": "#2d3449",
                    "secondary-fixed-dim": "#4edea3",
                    "primary-fixed": "#e1e0ff",
                    "outline": "#908fa0",
                    "surface-dim": "#0b1326",
                    "surface-bright": "#31394d",
                    "on-error": "#690005",
                    "on-surface": "#dae2fd",
                    "on-tertiary-fixed-variant": "#004e5c",
                    "tertiary-fixed-dim": "#4cd7f6",
                    "on-secondary-container": "#00311f",
                    "outline-variant": "#464554",
                    "inverse-primary": "#494bd6",
                    "surface-container": "#171f33",
                    "on-primary-container": "#0d0096",
                    "on-primary-fixed-variant": "#2f2ebe",
                    "primary-container": "#8083ff",
                    "inverse-on-surface": "#283044",
                    "secondary-fixed": "#6ffbbe",
                    "tertiary": "#4cd7f6",
                    "on-tertiary": "#003640",
                    "on-error-container": "#ffdad6",
                    "surface-tint": "#c0c1ff",
                    "error": "#ffb4ab",
                    "on-background": "#dae2fd",
                    "primary": "#c0c1ff",
                    "on-tertiary-container": "#002f38",
                    "error-container": "#93000a",
                    "tertiary-fixed": "#acedff",
                    "on-primary": "#1000a9",
                    "on-primary-fixed": "#07006c",
                    "secondary-container": "#00a572",
                    "surface-container-high": "#222a3d",
                    "inverse-surface": "#dae2fd",
                    "secondary": "#4edea3",
                    "on-secondary-fixed-variant": "#005236",
                    "on-secondary": "#003824",
                    "on-tertiary-fixed": "#001f26"
            },
            "borderRadius": {
                    "DEFAULT": "0.25rem",
                    "lg": "0.5rem",
                    "xl": "0.75rem",
                    "full": "9999px"
            },
            "spacing": {
                    "gutter": "24px",
                    "xs": "4px",
                    "lg": "48px",
                    "sm": "12px",
                    "base": "8px",
                    "md": "24px",
                    "xl": "80px",
                    "container-max": "1280px"
            },
            "fontFamily": {
                    "headline-lg-mobile": ["Inter"],
                    "label-sm": ["JetBrains Mono"],
                    "headline-md": ["Inter"],
                    "headline-lg": ["Inter"],
                    "display-lg": ["Inter"],
                    "body-lg": ["Inter"],
                    "label-md": ["JetBrains Mono"],
                    "body-md": ["Inter"]
            },
            "fontSize": {
                    "headline-lg-mobile": ["24px", {"lineHeight": "1.2", "fontWeight": "600"}],
                    "label-sm": ["12px", {"lineHeight": "1.4", "fontWeight": "500"}],
                    "headline-md": ["24px", {"lineHeight": "1.3", "fontWeight": "600"}],
                    "headline-lg": ["32px", {"lineHeight": "1.2", "letterSpacing": "-0.01em", "fontWeight": "600"}],
                    "display-lg": ["48px", {"lineHeight": "1.1", "letterSpacing": "-0.02em", "fontWeight": "700"}],
                    "body-lg": ["18px", {"lineHeight": "1.6", "fontWeight": "400"}],
                    "label-md": ["14px", {"lineHeight": "1.4", "letterSpacing": "0.05em", "fontWeight": "500"}],
                    "body-md": ["16px", {"lineHeight": "1.5", "fontWeight": "400"}]
            }
          },
        },
      }
    </script>
<style>
        body {
            background-color: #020617;
            color: #dae2fd;
            overflow-x: hidden;
        }
        .glass-card {
            background: rgba(15, 23, 42, 0.7);
            backdrop-filter: blur(20px);
            border: 1px solid rgba(255, 255, 255, 0.1);
            transition: all 0.3s ease;
        }
        .glass-card:hover {
            border-color: rgba(192, 193, 255, 0.3);
            transform: translateY(-4px);
        }
        .hero-gradient {
            background: radial-gradient(circle at top right, rgba(192, 193, 255, 0.15), transparent),
                        radial-gradient(circle at bottom left, rgba(78, 222, 163, 0.1), transparent);
        }
        .btn-gradient-primary {
            background: linear-gradient(135deg, #8083ff 0%, #494bd6 100%);
            transition: transform 0.2s;
        }
        .btn-gradient-primary:active {
            transform: scale(0.95);
        }
        .inner-glow {
            box-shadow: inset 0 1px 0 0 rgba(255, 255, 255, 0.1);
        }
        .material-symbols-outlined {
            font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
        }
    </style>
</head>
<body class="font-body-md text-body-md selection:bg-primary-container selection:text-on-primary-container">
<!-- TopNavBar -->
<nav class="fixed top-0 w-full z-50 bg-surface/70 backdrop-blur-md border-b border-outline-variant/30 shadow-sm">
<div class="flex justify-between items-center w-full px-gutter max-w-container-max mx-auto h-20">
<div class="flex items-center gap-8">
<a class="font-headline-md text-headline-md font-bold text-on-surface tracking-tight" href="#">FundFlow</a>
<div class="hidden md:flex gap-6 items-center">
<a class="text-primary font-bold border-b-2 border-primary pb-1 font-body-md text-body-md" href="#">Explore</a>
<a class="text-on-surface-variant hover:text-primary transition-colors font-body-md text-body-md" href="#">Launch</a>
</div>
</div>
<div class="flex items-center gap-md">
<div class="hidden md:flex items-center bg-surface-container rounded-full px-4 py-2 border border-outline-variant/30">
<span class="material-symbols-outlined text-on-surface-variant mr-2">search</span>
<input class="bg-transparent border-none focus:ring-0 text-label-md text-on-surface w-48 p-0 placeholder:text-on-surface-variant/60" placeholder="Search Nigerian projects..." type="text">
</div>
<div class="flex items-center gap-4">
<button class="material-symbols-outlined text-on-surface-variant hover:text-primary transition-colors">notifications</button>
<button class="bg-primary-container text-on-primary-container px-6 py-2.5 rounded-full font-label-md text-label-md font-bold inner-glow hover:brightness-110 active:scale-95 duration-200">
                    Connect Wallet
                </button>
</div>
</div>
</div>
</nav>
<main class="pt-20">
<!-- Hero Section -->
<section class="relative overflow-hidden hero-gradient py-xl md:py-32">
<div class="max-w-container-max mx-auto px-gutter grid grid-cols-1 lg:grid-cols-12 gap-lg items-center">
<div class="lg:col-span-7 space-y-md">
<div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary-container/20 border border-secondary/30 text-secondary-fixed-dim">
<span class="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
<span class="font-label-sm text-label-sm uppercase tracking-wider">Active in Nigeria &amp; Emerging Markets</span>
</div>
<h1 class="font-display-lg text-display-lg md:text-[64px] leading-[1.05] tracking-tighter text-on-surface">
                    Empowering African <span class="text-primary">Innovation</span> Through <span class="text-secondary">Decentralized</span> Capital
                </h1>
<p class="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">
                    FundFlow leverages blockchain to provide secure escrow and milestone-based governance for Nigerian creators. Scale your project with a global pool of contributors, secured by smart contracts.
                </p>
<div class="flex flex-wrap gap-md pt-4">
<button class="btn-gradient-primary px-8 py-4 rounded-xl font-headline-md text-headline-md text-on-primary-fixed inner-glow flex items-center gap-2">
                        Explore Campaigns
                        <span class="material-symbols-outlined">trending_flat</span>
</button>
<button class="glass-card px-8 py-4 rounded-xl font-headline-md text-headline-md text-on-surface inner-glow hover:bg-surface-variant/30">
                        Launch Campaign
                    </button>
</div>
</div>
<div class="lg:col-span-5 relative h-[400px] md:h-[500px]">
<div class="absolute inset-0 flex items-center justify-center">
<div class="relative w-72 h-72 md:w-96 md:h-96">
<div class="absolute inset-0 bg-primary/20 blur-[100px] rounded-full"></div>
<div class="absolute inset-0 glass-card rounded-3xl rotate-12 flex items-center justify-center shadow-2xl">
<div class="w-4/5 h-4/5 glass-card rounded-2xl border-primary/20 flex flex-col items-center justify-center gap-4">
<div class="w-24 h-24 rounded-full border-4 border-dashed border-primary/40 flex items-center justify-center">
<span class="material-symbols-outlined text-[48px] text-primary" style="font-variation-settings: 'FILL' 1;">security</span>
</div>
<div class="text-center">
<p class="font-label-sm text-label-sm text-primary uppercase">Blockchain Verified</p>
<p class="font-headline-md text-headline-md text-on-surface">Vault #NG-9901</p>
</div>
</div>
</div>
<div class="absolute -bottom-4 -left-4 glass-card p-6 rounded-2xl -rotate-6 border-secondary/30 shadow-xl">
<span class="material-symbols-outlined text-secondary text-[32px]">verified</span>
<p class="font-label-md text-label-md text-on-surface mt-2">Phase 1 Released</p>
</div>
</div>
</div>
</div>
</div>
</section>
<!-- Statistics Section -->
<section class="py-xl">
<div class="max-w-container-max mx-auto px-gutter">
<div class="grid grid-cols-2 lg:grid-cols-4 gap-md">
<div class="glass-card p-8 rounded-2xl text-center group">
<p class="font-display-lg text-display-lg text-primary mb-1 group-hover:scale-110 transition-transform">₦15B+</p>
<p class="font-label-md text-label-md text-on-surface-variant uppercase">Volume Handled</p>
</div>
<div class="glass-card p-8 rounded-2xl text-center group">
<p class="font-display-lg text-display-lg text-secondary mb-1 group-hover:scale-110 transition-transform">450+</p>
<p class="font-label-md text-label-md text-on-surface-variant uppercase">Active Hubs</p>
</div>
<div class="glass-card p-8 rounded-2xl text-center group">
<p class="font-display-lg text-display-lg text-tertiary mb-1 group-hover:scale-110 transition-transform">99.2%</p>
<p class="font-label-md text-label-md text-on-surface-variant uppercase">Verification Rate</p>
</div>
<div class="glass-card p-8 rounded-2xl text-center group">
<p class="font-display-lg text-display-lg text-on-surface mb-1 group-hover:scale-110 transition-transform">120k+</p>
<p class="font-label-md text-label-md text-on-surface-variant uppercase">Global Backers</p>
</div>
</div>
</div>
</section>
<!-- Features Grid -->
<section class="py-xl bg-surface-container-low/30">
<div class="max-w-container-max mx-auto px-gutter">
<div class="text-center max-w-3xl mx-auto mb-xl">
<h2 class="font-headline-lg text-headline-lg mb-4">The Trust Layer for African Builders</h2>
<p class="font-body-lg text-body-lg text-on-surface-variant">We bridge the gap between global liquidity and local impact through transparent, automated protocols.</p>
</div>
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-md">
<div class="glass-card p-8 rounded-2xl space-y-4">
<div class="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
<span class="material-symbols-outlined text-primary">account_balance_wallet</span>
</div>
<h3 class="font-headline-md text-headline-md">Stablecoin Funding</h3>
<p class="font-body-md text-body-md text-on-surface-variant leading-relaxed">Accept USDT, USDC, and Local Tokens to hedge against currency volatility.</p>
</div>
<div class="glass-card p-8 rounded-2xl space-y-4">
<div class="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center">
<span class="material-symbols-outlined text-secondary">gavel</span>
</div>
<h3 class="font-headline-md text-headline-md">DAO Governance</h3>
<p class="font-body-md text-body-md text-on-surface-variant leading-relaxed">Backers have a say in major project pivots through decentralized voting power.</p>
</div>
<div class="glass-card p-8 rounded-2xl space-y-4">
<div class="w-12 h-12 bg-tertiary/10 rounded-xl flex items-center justify-center">
<span class="material-symbols-outlined text-tertiary">rocket_launch</span>
</div>
<h3 class="font-headline-md text-headline-md">Milestone Unlocks</h3>
<p class="font-body-md text-body-md text-on-surface-variant leading-relaxed">Funds are programmatically released only when verified project goals are achieved.</p>
</div>
<div class="glass-card p-8 rounded-2xl space-y-4">
<div class="w-12 h-12 bg-error/10 rounded-xl flex items-center justify-center">
<span class="material-symbols-outlined text-error">policy</span>
</div>
<h3 class="font-headline-md text-headline-md">Fail-Safe Refunds</h3>
<p class="font-body-md text-body-md text-on-surface-variant leading-relaxed">If targets aren't met, remaining funds are automatically returned to the community.</p>
</div>
</div>
</div>
</section>
<!-- Featured Campaigns -->
<section class="py-xl">
<div class="max-w-container-max mx-auto px-gutter">
<div class="flex justify-between items-end mb-xl">
<div>
<h2 class="font-headline-lg text-headline-lg mb-2">Impact Campaigns</h2>
<p class="font-body-md text-body-md text-on-surface-variant">Support groundbreaking initiatives across the continent.</p>
</div>
<button class="hidden md:flex items-center gap-2 text-primary font-bold hover:underline">
                    View All Projects
                    <span class="material-symbols-outlined">arrow_forward</span>
</button>
</div>
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-lg">
<!-- Campaign Card 1 -->
<div class="glass-card rounded-3xl overflow-hidden group">
<div class="h-56 overflow-hidden relative">
<img alt="Lagos Tech Hub Expansion" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src="https://lh3.googleusercontent.com/aida/AP1WRLvWgbkoTA0qVUW1HjSHWzFoxMRrtP2pjXFtCYLaQbNvNLIlne_pOng9Z1vHdCRqccLWwB-KLF8au68yigtEqL2SGWZt04eS_XsfUcufQ0HsX7uAA5FgjIj3gFOuJlg5Xdw4SNDMYOBFCT8VkclvfE5YJhe-0l-NZ4Yy7xo10JUlqYrfv1FcIZLQQ82sftAjAvqluNjMoXnxZYO6IcxwFkAUTydo0U5M6J25M9LEoVQoHJQMM9dV8GcoFG9q">
<div class="absolute top-4 right-4 bg-surface/80 backdrop-blur px-3 py-1 rounded-full border border-outline-variant/30 text-label-sm">
                            15 Days Left
                        </div>
</div>
<div class="p-8 space-y-md">
<div class="flex items-center gap-3">
<div class="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
<span class="material-symbols-outlined text-primary text-sm">person</span>
</div>
<span class="font-label-md text-label-md text-on-surface-variant">by @LagosInnovate</span>
</div>
<h3 class="font-headline-md text-headline-md text-on-surface group-hover:text-primary transition-colors">Lagos Tech Hub Expansion</h3>
<div class="space-y-2">
<div class="flex justify-between font-label-md text-label-md">
<span class="text-on-surface">78% funded</span>
<span class="text-on-surface-variant">85.5 ETH</span>
</div>
<div class="h-2 w-full bg-surface-container rounded-full overflow-hidden">
<div class="h-full w-[78%] bg-gradient-to-r from-primary to-secondary"></div>
</div>
</div>
</div>
</div>
<!-- Campaign Card 2 -->
<div class="glass-card rounded-3xl overflow-hidden group">
<div class="h-56 overflow-hidden relative">
<img alt="Edo State Cassava Processing" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src="https://lh3.googleusercontent.com/aida/AP1WRLvL0bL88FE3crQStXC7U4YSPEedulV1PpGgJwJP7o0lDw7GhYzCWg_Nim5fPfw7-DMrlmk_GKoXkOvyuGO0Gji7d4MuEhOFB9L92MfqTXdmTNbWA7gE-OHXy2DDV0hBOwOxvKzoYChGqM_QXoE0K3o55022WLi7J_BGKf1TbKRlqBv3LONWODNgZPSDZ0FIti_qAo0G0yuzGNsKh0l_H5dNDu0K9mBkLVaH-EQNaBuYPxSIeOJ_ZCOHb6YR">
<div class="absolute top-4 right-4 bg-surface/80 backdrop-blur px-3 py-1 rounded-full border border-outline-variant/30 text-label-sm">
                            8 Days Left
                        </div>
</div>
<div class="p-8 space-y-md">
<div class="flex items-center gap-3">
<div class="w-8 h-8 rounded-full bg-secondary/20 flex items-center justify-center">
<span class="material-symbols-outlined text-secondary text-sm">agriculture</span>
</div>
<span class="font-label-md text-label-md text-on-surface-variant">by @EdoAgriDAO</span>
</div>
<h3 class="font-headline-md text-headline-md text-on-surface group-hover:text-primary transition-colors">Edo State Cassava Processing</h3>
<div class="space-y-2">
<div class="flex justify-between font-label-md text-label-md">
<span class="text-on-surface">42% funded</span>
<span class="text-on-surface-variant">32.0 ETH</span>
</div>
<div class="h-2 w-full bg-surface-container rounded-full overflow-hidden">
<div class="h-full w-[42%] bg-gradient-to-r from-primary to-secondary"></div>
</div>
</div>
</div>
</div>
<!-- Campaign Card 3 -->
<div class="glass-card rounded-3xl overflow-hidden group">
<div class="h-56 overflow-hidden relative">
<img alt="Ibadan Solar Neighborhood" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src="https://lh3.googleusercontent.com/aida/AP1WRLsSKqxLAdAbnSmHGpCMxjsRNEWoOMKH-j6HNmfC7hwoXC56v5eF1UCyFwlOUbxcQIFZCuHlsJSMpdiZU1FwmusX-CACtiC2dPYUAzi31yUJ9dXUpUkcs-C9vC4p2oB0-iSoSHMFMWfsMoehrcLK3ITEQsrMwFkw4dBgtYlV1sFN76wjMOjDfnBlJIkeKhTl4s-qvrW3JFWLPnzl0hsc1VciMKnIxM1wYXhPhantHT0iUoiEe-psOOz-JTk">
<div class="absolute top-4 right-4 bg-surface/80 backdrop-blur px-3 py-1 rounded-full border border-outline-variant/30 text-label-sm">
                            22 Days Left
                        </div>
</div>
<div class="p-8 space-y-md">
<div class="flex items-center gap-3">
<div class="w-8 h-8 rounded-full bg-tertiary/20 flex items-center justify-center">
<span class="material-symbols-outlined text-tertiary text-sm">solar_power</span>
</div>
<span class="font-label-md text-label-md text-on-surface-variant">by @SolarGridIB</span>
</div>
<h3 class="font-headline-md text-headline-md text-on-surface group-hover:text-primary transition-colors">Ibadan Solar Neighborhood</h3>
<div class="space-y-2">
<div class="flex justify-between font-label-md text-label-md">
<span class="text-on-surface">115% funded</span>
<span class="text-on-surface-variant">120.4 ETH</span>
</div>
<div class="h-2 w-full bg-surface-container rounded-full overflow-hidden">
<div class="h-full w-full bg-gradient-to-r from-primary to-secondary"></div>
</div>
</div>
</div>
</div>
</div>
</div>
</section>
<!-- CTA Section -->
<section class="py-xl">
<div class="max-w-container-max mx-auto px-gutter">
<div class="glass-card rounded-[40px] p-12 md:p-24 text-center relative overflow-hidden">
<div class="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary/10 via-transparent to-secondary/10 -z-10"></div>
<div class="max-w-2xl mx-auto space-y-8">
<h2 class="font-display-lg text-display-lg text-on-surface">Build the Future of Africa</h2>
<p class="font-body-lg text-body-lg text-on-surface-variant">Join thousands of visionaries and backers in the next evolution of capital formation. Start your campaign in minutes.</p>
<div class="flex flex-col md:flex-row items-center justify-center gap-md">
<button class="w-full md:w-auto btn-gradient-primary px-10 py-5 rounded-2xl font-headline-md text-headline-md text-on-primary-fixed shadow-2xl">Start a Campaign</button>
<button class="w-full md:w-auto glass-card px-10 py-5 rounded-2xl font-headline-md text-headline-md text-on-surface hover:bg-surface-variant/50">Read Documentation</button>
</div>
</div>
</div>
</div>
</section>
</main>
<!-- Footer -->
<footer class="bg-surface-container-lowest border-t border-outline-variant/20 w-full py-12">
<div class="max-w-container-max mx-auto px-gutter grid grid-cols-1 md:grid-cols-4 gap-lg">
<div class="space-y-4">
<a class="font-headline-md text-headline-md text-on-surface font-bold tracking-tight" href="#">FundFlow</a>
<p class="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                © 2024 FundFlow Africa. Decentralized &amp; Transparent. Empowering creators through blockchain technology.
            </p>
<div class="flex gap-4">
<a class="text-on-surface-variant hover:text-primary transition-all" href="#"><span class="material-symbols-outlined">public</span></a>
<a class="text-on-surface-variant hover:text-primary transition-all" href="#"><span class="material-symbols-outlined">share</span></a>
<a class="text-on-surface-variant hover:text-primary transition-all" href="#"><span class="material-symbols-outlined">forum</span></a>
</div>
</div>
<div class="space-y-4">
<h4 class="font-label-md text-label-md text-on-surface font-bold uppercase tracking-widest">Platform</h4>
<ul class="space-y-2">
<li><a class="font-body-md text-body-md text-on-surface-variant hover:text-secondary hover:underline transition-all" href="#">Explore</a></li>
<li><a class="font-body-md text-body-md text-on-surface-variant hover:text-secondary hover:underline transition-all" href="#">Launch Campaign</a></li>
<li><a class="font-body-md text-body-md text-on-surface-variant hover:text-secondary hover:underline transition-all" href="#">How it Works</a></li>
<li><a class="font-body-md text-body-md text-on-surface-variant hover:text-secondary hover:underline transition-all" href="#">Milestone Voting</a></li>
</ul>
</div>
<div class="space-y-4">
<h4 class="font-label-md text-label-md text-on-surface font-bold uppercase tracking-widest">Resources</h4>
<ul class="space-y-2">
<li><a class="font-body-md text-body-md text-on-surface-variant hover:text-secondary hover:underline transition-all" href="#">Whitepaper</a></li>
<li><a class="font-body-md text-body-md text-on-surface-variant hover:text-secondary hover:underline transition-all" href="#">Support Hub</a></li>
<li><a class="font-body-md text-body-md text-on-surface-variant hover:text-secondary hover:underline transition-all" href="#">Security Audits</a></li>
<li><a class="font-body-md text-body-md text-on-surface-variant hover:text-secondary hover:underline transition-all" href="#">Tokenomics</a></li>
</ul>
</div>
<div class="space-y-4">
<h4 class="font-label-md text-label-md text-on-surface font-bold uppercase tracking-widest">Legal</h4>
<ul class="space-y-2">
<li><a class="font-body-md text-body-md text-on-surface-variant hover:text-secondary hover:underline transition-all" href="#">Terms of Service</a></li>
<li><a class="font-body-md text-body-md text-on-surface-variant hover:text-secondary hover:underline transition-all" href="#">Privacy Policy</a></li>
<li><a class="font-body-md text-body-md text-on-surface-variant hover:text-secondary hover:underline transition-all" href="#">Compliance</a></li>
</ul>
</div>
</div>
</footer>
<script>
    // Simple animation to reveal sections on scroll
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('opacity-100', 'translate-y-0');
                entry.target.classList.remove('opacity-0', 'translate-y-10');
            }
        });
    }, observerOptions);

    document.querySelectorAll('section').forEach(section => {
        section.classList.add('transition-all', 'duration-700', 'opacity-0', 'translate-y-10');
        observer.observe(section);
    });

    // Wallet connect mock interaction
    const connectBtn = Array.from(document.querySelectorAll('button')).find(btn => btn.textContent.includes('Connect Wallet'));
    if (connectBtn) {
        connectBtn.addEventListener('click', () => {
            const isConnected = connectBtn.textContent.includes('0x');
            if (!isConnected) {
                connectBtn.textContent = '0x4f...8821';
                connectBtn.classList.remove('bg-primary-container');
                connectBtn.classList.add('bg-secondary-container', 'text-on-secondary-container');
            } else {
                connectBtn.textContent = 'Connect Wallet';
                connectBtn.classList.add('bg-primary-container');
                connectBtn.classList.remove('bg-secondary-container', 'text-on-secondary-container');
            }
        });
    }
</script>
</body></html>

<!-- Explore Campaigns -->
<!DOCTYPE html><html class="dark" lang="en"><head>
<meta charset="utf-8">
<meta content="width=device-width, initial-scale=1.0" name="viewport">
<title>FundFlow | Advanced Campaign Discovery</title>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&amp;family=JetBrains+Mono:wght@500&amp;display=swap" rel="stylesheet">
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet">
<style>
        :root {
            --glass-fill: rgba(15, 23, 42, 0.7);
            --glass-border: rgba(255, 255, 255, 0.1);
        }
        body {
            background-color: #020617;
            color: #dae2fd;
            font-family: 'Inter', sans-serif;
            overflow-x: hidden;
        }
        .glass-card {
            background: var(--glass-fill);
            backdrop-filter: blur(20px);
            border: 1px solid var(--glass-border);
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .glass-card:hover {
            border-color: rgba(192, 193, 255, 0.3);
            transform: translateY(-4px);
            box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.5);
        }
        .inner-glow {
            box-shadow: inset 0 1px 0 0 rgba(255, 255, 255, 0.05);
        }
        .progress-gradient {
            background: linear-gradient(90deg, #00aced 0%, #4edea3 100%);
        }
        .primary-gradient {
            background: linear-gradient(135deg, #494bd6 0%, #8083ff 100%);
        }
        /* Custom scrollbar */
        ::-webkit-scrollbar {
            width: 6px;
        }
        ::-webkit-scrollbar-track {
            background: #0b1326;
        }
        ::-webkit-scrollbar-thumb {
            background: #2d3449;
            border-radius: 10px;
        }
        ::-webkit-scrollbar-thumb:hover {
            background: #c0c1ff;
        }
    </style>
<script id="tailwind-config">
        tailwind.config = {
            darkMode: "class",
            theme: {
                extend: {
                    "colors": {
                        "primary-fixed-dim": "#c0c1ff",
                        "tertiary-container": "#009eb9",
                        "surface-container-highest": "#2d3449",
                        "surface-container-lowest": "#060e20",
                        "on-surface-variant": "#c7c4d7",
                        "background": "#0b1326",
                        "on-secondary-fixed": "#002113",
                        "surface-container-low": "#131b2e",
                        "surface": "#0b1326",
                        "surface-variant": "#2d3449",
                        "secondary-fixed-dim": "#4edea3",
                        "primary-fixed": "#e1e0ff",
                        "outline": "#908fa0",
                        "surface-dim": "#0b1326",
                        "surface-bright": "#31394d",
                        "on-error": "#690005",
                        "on-surface": "#dae2fd",
                        "on-tertiary-fixed-variant": "#004e5c",
                        "tertiary-fixed-dim": "#4cd7f6",
                        "on-secondary-container": "#00311f",
                        "outline-variant": "#464554",
                        "inverse-primary": "#494bd6",
                        "surface-container": "#171f33",
                        "on-primary-container": "#0d0096",
                        "on-primary-fixed-variant": "#2f2ebe",
                        "primary-container": "#8083ff",
                        "inverse-on-surface": "#283044",
                        "secondary-fixed": "#6ffbbe",
                        "tertiary": "#4cd7f6",
                        "on-tertiary": "#003640",
                        "on-error-container": "#ffdad6",
                        "surface-tint": "#c0c1ff",
                        "error": "#ffb4ab",
                        "on-background": "#dae2fd",
                        "primary": "#c0c1ff",
                        "on-tertiary-container": "#002f38",
                        "error-container": "#93000a",
                        "tertiary-fixed": "#acedff",
                        "on-primary": "#1000a9",
                        "on-primary-fixed": "#07006c",
                        "secondary-container": "#00a572",
                        "surface-container-high": "#222a3d",
                        "inverse-surface": "#dae2fd",
                        "secondary": "#4edea3",
                        "on-secondary-fixed-variant": "#005236",
                        "on-secondary": "#003824",
                        "on-tertiary-fixed": "#001f26"
                    },
                    "borderRadius": {
                        "DEFAULT": "0.25rem",
                        "lg": "0.5rem",
                        "xl": "0.75rem",
                        "full": "9999px"
                    },
                    "spacing": {
                        "gutter": "24px",
                        "xs": "4px",
                        "lg": "48px",
                        "sm": "12px",
                        "base": "8px",
                        "md": "24px",
                        "xl": "80px",
                        "container-max": "1280px"
                    },
                    "fontFamily": {
                        "headline-lg-mobile": ["Inter"],
                        "label-sm": ["JetBrains Mono"],
                        "headline-md": ["Inter"],
                        "headline-lg": ["Inter"],
                        "display-lg": ["Inter"],
                        "body-lg": ["Inter"],
                        "label-md": ["JetBrains Mono"],
                        "body-md": ["Inter"]
                    },
                    "fontSize": {
                        "headline-lg-mobile": ["24px", {"lineHeight": "1.2", "fontWeight": "600"}],
                        "label-sm": ["12px", {"lineHeight": "1.4", "fontWeight": "500"}],
                        "headline-md": ["24px", {"lineHeight": "1.3", "fontWeight": "600"}],
                        "headline-lg": ["32px", {"lineHeight": "1.2", "letterSpacing": "-0.01em", "fontWeight": "600"}],
                        "display-lg": ["48px", {"lineHeight": "1.1", "letterSpacing": "-0.02em", "fontWeight": "700"}],
                        "body-lg": ["18px", {"lineHeight": "1.6", "fontWeight": "400"}],
                        "label-md": ["14px", {"lineHeight": "1.4", "letterSpacing": "0.05em", "fontWeight": "500"}],
                        "body-md": ["16px", {"lineHeight": "1.5", "fontWeight": "400"}]
                    }
                },
            },
        }
    </script>
</head>
<body class="bg-surface text-on-surface">
<!-- TopNavBar -->
<nav class="fixed top-0 w-full z-50 bg-surface/70 backdrop-blur-md border-b border-outline-variant/30 shadow-sm h-20">
<div class="flex justify-between items-center w-full px-gutter max-w-container-max mx-auto h-full">
<div class="flex items-center gap-8">
<span class="font-headline-md text-headline-md font-bold text-on-surface tracking-tight">FundFlow</span>
<div class="hidden md:flex gap-6">
<a class="text-primary font-bold border-b-2 border-primary pb-1 font-body-md text-body-md" href="#">Explore</a>
<a class="text-on-surface-variant hover:text-primary transition-colors font-body-md text-body-md" href="#">Launch</a>
</div>
</div>
<div class="flex items-center gap-4">
<button class="material-symbols-outlined text-on-surface-variant hover:text-primary p-2 transition-all">notifications</button>
<div class="flex items-center bg-surface-container-high px-4 py-2 rounded-full border border-outline-variant/30 gap-3">
<div class="w-2 h-2 rounded-full bg-secondary shadow-[0_0_8px_rgba(78,222,163,0.6)]"></div>
<span class="font-label-md text-label-md text-on-surface-variant">0x71C...492A</span>
<button class="primary-gradient text-on-primary px-4 py-1.5 rounded-full text-label-md font-bold hover:opacity-90 active:scale-95 transition-all">Connect Wallet</button>
</div>
</div>
</div>
</nav>
<main class="pt-32 pb-xl px-gutter max-w-container-max mx-auto">
<div class="grid grid-cols-1 md:grid-cols-12 gap-gutter">
<!-- Filter Sidebar -->
<aside class="md:col-span-3 space-y-8">
<div class="glass-card p-6 rounded-xl inner-glow">
<h3 class="font-headline-md text-headline-md text-primary mb-6">Discovery</h3>
<!-- Search -->
<div class="relative mb-8">
<span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline">search</span>
<input class="w-full bg-surface-container-low border border-outline-variant/30 rounded-lg py-3 pl-10 pr-4 text-on-surface focus:border-primary-container focus:ring-1 focus:ring-primary-container outline-none transition-all font-label-md" placeholder="Search campaigns..." type="text">
</div>
<div class="space-y-8">
<!-- Status Filter -->
<div>
<p class="font-label-md text-label-md text-primary-fixed-dim uppercase tracking-widest mb-4">Status</p>
<div class="space-y-3">
<label class="flex items-center gap-3 cursor-pointer group">
<input checked="" class="w-5 h-5 rounded border-outline-variant bg-surface-container-low text-primary focus:ring-primary-container" type="checkbox">
<span class="text-body-md text-on-surface-variant group-hover:text-on-surface transition-colors">Active</span>
</label>
<label class="flex items-center gap-3 cursor-pointer group">
<input class="w-5 h-5 rounded border-outline-variant bg-surface-container-low text-primary focus:ring-primary-container" type="checkbox">
<span class="text-body-md text-on-surface-variant group-hover:text-on-surface transition-colors">Completed</span>
</label>
<label class="flex items-center gap-3 cursor-pointer group">
<input class="w-5 h-5 rounded border-outline-variant bg-surface-container-low text-primary focus:ring-primary-container" type="checkbox">
<span class="text-body-md text-on-surface-variant group-hover:text-on-surface transition-colors">Failed</span>
</label>
</div>
</div>
<!-- Categories Filter -->
<div>
<p class="font-label-md text-label-md text-primary-fixed-dim uppercase tracking-widest mb-4">Categories</p>
<div class="space-y-3">
<label class="flex items-center gap-3 cursor-pointer group">
<input class="w-5 h-5 rounded border-outline-variant bg-surface-container-low text-secondary focus:ring-secondary-container" type="checkbox">
<span class="text-body-md text-on-surface-variant group-hover:text-on-surface transition-colors">Tech</span>
</label>
<label class="flex items-center gap-3 cursor-pointer group">
<input class="w-5 h-5 rounded border-outline-variant bg-surface-container-low text-secondary focus:ring-secondary-container" type="checkbox">
<span class="text-body-md text-on-surface-variant group-hover:text-on-surface transition-colors">Solar</span>
</label>
<label class="flex items-center gap-3 cursor-pointer group">
<input class="w-5 h-5 rounded border-outline-variant bg-surface-container-low text-secondary focus:ring-secondary-container" type="checkbox">
<span class="text-body-md text-on-surface-variant group-hover:text-on-surface transition-colors">Agriculture</span>
</label>
<label class="flex items-center gap-3 cursor-pointer group">
<input class="w-5 h-5 rounded border-outline-variant bg-surface-container-low text-secondary focus:ring-secondary-container" type="checkbox">
<span class="text-body-md text-on-surface-variant group-hover:text-on-surface transition-colors">DeFi</span>
</label>
</div>
</div>
</div>
</div>
<!-- Stats Widget -->
<div class="glass-card p-6 rounded-xl border-secondary/20">
<p class="text-label-md font-label-md text-secondary mb-2">Market Overview</p>
<div class="text-headline-lg font-headline-lg mb-1">₦ 15.2M</div>
<p class="text-body-md text-on-surface-variant">Total Value Locked</p>
</div>
</aside>
<!-- Campaign Grid -->
<div class="md:col-span-9">
<!-- Header Actions -->
<div class="flex justify-between items-center mb-8">
<h2 class="font-headline-lg text-headline-lg text-on-surface">Active Campaigns <span class="text-outline-variant font-normal text-headline-md ml-2">(124)</span></h2>
<div class="flex gap-2">
<button class="bg-surface-container-high hover:bg-surface-container-highest p-2 rounded-lg border border-outline-variant/30 transition-all">
<span class="material-symbols-outlined">grid_view</span>
</button>
<button class="bg-surface-container-low hover:bg-surface-container-highest p-2 rounded-lg border border-outline-variant/30 transition-all">
<span class="material-symbols-outlined text-outline">view_list</span>
</button>
</div>
</div>
<!-- Bento-ish Grid -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
<!-- Campaign Card 1: Lagos Innovate Hub -->
<div class="glass-card rounded-2xl overflow-hidden flex flex-col group">
<div class="relative h-48 overflow-hidden">
<img alt="Lagos Innovate Hub" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" src="https://lh3.googleusercontent.com/aida/AP1WRLvWgbkoTA0qVUW1HjSHWzFoxMRrtP2pjXFtCYLaQbNvNLIlne_pOng9Z1vHdCRqccLWwB-KLF8au68yigtEqL2SGWZt04eS_XsfUcufQ0HsX7uAA5FgjIj3gFOuJlg5Xdw4SNDMYOBFCT8VkclvfE5YJhe-0l-NZ4Yy7xo10JUlqYrfv1FcIZLQQ82sftAjAvqluNjMoXnxZYO6IcxwFkAUTydo0U5M6J25M9LEoVQoHJQMM9dV8GcoFG9q">
<div class="absolute top-4 left-4">
<span class="bg-surface-container-lowest/80 backdrop-blur-md px-3 py-1 rounded-full text-label-sm font-label-sm text-primary border border-primary/20">TECH</span>
</div>
</div>
<div class="p-6 flex-grow flex flex-col">
<div class="flex justify-between items-start mb-2">
<h3 class="font-headline-md text-headline-md text-on-surface leading-tight">Lagos Innovate Hub</h3>
<span class="material-symbols-outlined text-outline hover:text-primary cursor-pointer transition-colors">favorite</span>
</div>
<p class="text-body-md text-on-surface-variant mb-4 line-clamp-2">Expanding the premier tech ecosystem in Yaba, providing resources for 100+ new startups.</p>
<div class="flex items-center gap-2 mb-6">
<div class="w-6 h-6 rounded-full bg-primary-container/20 flex items-center justify-center">
<span class="material-symbols-outlined text-primary text-[14px]">rocket_launch</span>
</div>
<span class="text-label-md font-label-md text-outline">By Lagos Tech Coalition</span>
</div>
<div class="mt-auto space-y-4">
<div class="space-y-2">
<div class="flex justify-between text-label-md font-label-md">
<span class="text-on-surface">₦ 45M / 60M</span>
<span class="text-secondary">75%</span>
</div>
<div class="h-1.5 w-full bg-surface-container-highest rounded-full overflow-hidden">
<div class="h-full progress-gradient" style="width: 75%"></div>
</div>
</div>
<div class="flex justify-between items-center">
<div class="flex items-center gap-1 text-on-surface-variant">
<span class="material-symbols-outlined text-sm">schedule</span>
<span class="text-label-md font-label-md">12 Days Left</span>
</div>
<button class="bg-surface-container-highest hover:bg-primary-container hover:text-on-primary-container px-4 py-2 rounded-lg text-label-md font-bold transition-all inner-glow">View Details</button>
</div>
</div>
</div>
</div>
<!-- Campaign Card 2: Naija Green Energy -->
<div class="glass-card rounded-2xl overflow-hidden flex flex-col group">
<div class="relative h-48 overflow-hidden">
<img alt="Naija Green Energy" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" src="https://lh3.googleusercontent.com/aida/AP1WRLsSKqxLAdAbnSmHGpCMxjsRNEWoOMKH-j6HNmfC7hwoXC56v5eF1UCyFwlOUbxcQIFZCuHlsJSMpdiZU1FwmusX-CACtiC2dPYUAzi31yUJ9dXUpUkcs-C9vC4p2oB0-iSoSHMFMWfsMoehrcLK3ITEQsrMwFkw4dBgtYlV1sFN76wjMOjDfnBlJIkeKhTl4s-qvrW3JFWLPnzl0hsc1VciMKnIxM1wYXhPhantHT0iUoiEe-psOOz-JTk">
<div class="absolute top-4 left-4">
<span class="bg-surface-container-lowest/80 backdrop-blur-md px-3 py-1 rounded-full text-label-sm font-label-sm text-secondary border border-secondary/20">SOLAR</span>
</div>
</div>
<div class="p-6 flex-grow flex flex-col">
<div class="flex justify-between items-start mb-2">
<h3 class="font-headline-md text-headline-md text-on-surface leading-tight">Naija Green Energy</h3>
<span class="material-symbols-outlined text-outline hover:text-primary cursor-pointer transition-colors">favorite</span>
</div>
<p class="text-body-md text-on-surface-variant mb-4 line-clamp-2">Bringing affordable solar solutions to 5,000 households across Lagos suburbs.</p>
<div class="flex items-center gap-2 mb-6">
<div class="w-6 h-6 rounded-full bg-secondary-container/20 flex items-center justify-center">
<span class="material-symbols-outlined text-secondary text-[14px]">sunny</span>
</div>
<span class="text-label-md font-label-md text-outline">By SolarStream Nigeria</span>
</div>
<div class="mt-auto space-y-4">
<div class="space-y-2">
<div class="flex justify-between text-label-md font-label-md">
<span class="text-on-surface">₦ 120M / 200M</span>
<span class="text-secondary">60%</span>
</div>
<div class="h-1.5 w-full bg-surface-container-highest rounded-full overflow-hidden">
<div class="h-full progress-gradient" style="width: 60%"></div>
</div>
</div>
<div class="flex justify-between items-center">
<div class="flex items-center gap-1 text-on-surface-variant">
<span class="material-symbols-outlined text-sm">schedule</span>
<span class="text-label-md font-label-md">24 Days Left</span>
</div>
<button class="bg-surface-container-highest hover:bg-primary-container hover:text-on-primary-container px-4 py-2 rounded-lg text-label-md font-bold transition-all inner-glow">View Details</button>
</div>
</div>
</div>
</div>
<!-- Campaign Card 3: Rural Harvest -->
<div class="glass-card rounded-2xl overflow-hidden flex flex-col group">
<div class="relative h-48 overflow-hidden">
<img alt="Rural Harvest" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" src="https://lh3.googleusercontent.com/aida/AP1WRLvL0bL88FE3crQStXC7U4YSPEedulV1PpGgJwJP7o0lDw7GhYzCWg_Nim5fPfw7-DMrlmk_GKoXkOvyuGO0Gji7d4MuEhOFB9L92MfqTXdmTNbWA7gE-OHXy2DDV0hBOwOxvKzoYChGqM_QXoE0K3o55022WLi7J_BGKf1TbKRlqBv3LONWODNgZPSDZ0FIti_qAo0G0yuzGNsKh0l_H5dNDu0K9mBkLVaH-EQNaBuYPxSIeOJ_ZCOHb6YR">
<div class="absolute top-4 left-4">
<span class="bg-surface-container-lowest/80 backdrop-blur-md px-3 py-1 rounded-full text-label-sm font-label-sm text-tertiary border border-tertiary/20">AGRI</span>
</div>
</div>
<div class="p-6 flex-grow flex flex-col">
<div class="flex justify-between items-start mb-2">
<h3 class="font-headline-md text-headline-md text-on-surface leading-tight">Rural Harvest</h3>
<span class="material-symbols-outlined text-outline hover:text-primary cursor-pointer transition-colors">favorite</span>
</div>
<p class="text-body-md text-on-surface-variant mb-4 line-clamp-2">Modernizing cassava processing in Edo State with industrial-grade mechanization.</p>
<div class="flex items-center gap-2 mb-6">
<div class="w-6 h-6 rounded-full bg-secondary-container/20 flex items-center justify-center">
<span class="material-symbols-outlined text-secondary text-[14px]">agriculture</span>
</div>
<span class="text-label-md font-label-md text-outline">By Edo Agri-Cooperative</span>
</div>
<div class="mt-auto space-y-4">
<div class="space-y-2">
<div class="flex justify-between text-label-md font-label-md">
<span class="text-on-surface">₦ 18M / 20M</span>
<span class="text-secondary">90%</span>
</div>
<div class="h-1.5 w-full bg-surface-container-highest rounded-full overflow-hidden">
<div class="h-full progress-gradient" style="width: 90%"></div>
</div>
</div>
<div class="flex justify-between items-center">
<div class="flex items-center gap-1 text-on-surface-variant">
<span class="material-symbols-outlined text-sm">schedule</span>
<span class="text-label-md font-label-md">3 Days Left</span>
</div>
<button class="bg-surface-container-highest hover:bg-primary-container hover:text-on-primary-container px-4 py-2 rounded-lg text-label-md font-bold transition-all inner-glow">View Details</button>
</div>
</div>
</div>
</div>
<!-- Launch Yours CTA -->
<div class="glass-card rounded-2xl border-dashed border-2 border-outline-variant/50 flex flex-col items-center justify-center p-8 text-center hover:border-primary/50 transition-all cursor-pointer group">
<div class="w-16 h-16 rounded-full bg-surface-container-highest flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
<span class="material-symbols-outlined text-headline-lg text-primary">add</span>
</div>
<h3 class="font-headline-md text-headline-md text-on-surface mb-2">Launch Yours</h3>
<p class="text-body-md text-on-surface-variant mb-6">Have a visionary project in Nigeria? Get funded by the community today.</p>
<button class="primary-gradient text-on-primary px-6 py-2 rounded-xl text-label-md font-bold">Start Campaign</button>
</div>
</div>
<!-- Pagination -->
<div class="mt-12 flex justify-center items-center gap-4">
<button class="material-symbols-outlined p-2 rounded-lg bg-surface-container-low text-on-surface-variant hover:bg-surface-container-high transition-colors">chevron_left</button>
<div class="flex gap-2">
<button class="w-10 h-10 rounded-lg bg-primary text-on-primary font-bold">1</button>
<button class="w-10 h-10 rounded-lg bg-surface-container-low text-on-surface-variant hover:bg-surface-container-high transition-colors">2</button>
<button class="w-10 h-10 rounded-lg bg-surface-container-low text-on-surface-variant hover:bg-surface-container-high transition-colors">3</button>
<span class="text-on-surface-variant flex items-end px-2">...</span>
<button class="w-10 h-10 rounded-lg bg-surface-container-low text-on-surface-variant hover:bg-surface-container-high transition-colors">12</button>
</div>
<button class="material-symbols-outlined p-2 rounded-lg bg-surface-container-low text-on-surface-variant hover:bg-surface-container-high transition-colors">chevron_right</button>
</div>
</div>
</div>
</main>
<!-- Footer -->
<footer class="w-full py-12 bg-surface-container-lowest border-t border-outline-variant/20">
<div class="max-w-container-max mx-auto px-gutter grid grid-cols-1 md:grid-cols-4 gap-lg">
<div class="space-y-4">
<span class="font-headline-md text-headline-md text-on-surface font-bold">FundFlow</span>
<p class="text-body-md text-on-surface-variant font-body-md">The world's first decentralized marketplace for high-stakes capital and milestone-based crowdfunding.</p>
</div>
<div>
<h4 class="text-primary font-bold mb-6 font-label-md">Ecosystem</h4>
<ul class="space-y-3">
<li><a class="text-on-surface-variant hover:text-secondary transition-all duration-300 font-body-md" href="#">Explore Projects</a></li>
<li><a class="text-on-surface-variant hover:text-secondary transition-all duration-300 font-body-md" href="#">Staking</a></li>
<li><a class="text-on-surface-variant hover:text-secondary transition-all duration-300 font-body-md" href="#">Governance</a></li>
</ul>
</div>
<div>
<h4 class="text-primary font-bold mb-6 font-label-md">Resources</h4>
<ul class="space-y-3">
<li><a class="text-on-surface-variant hover:text-secondary transition-all duration-300 font-body-md" href="#">Documentation</a></li>
<li><a class="text-on-surface-variant hover:text-secondary transition-all duration-300 font-body-md" href="#">Whitepaper</a></li>
<li><a class="text-on-surface-variant hover:text-secondary transition-all duration-300 font-body-md" href="#">Audit Reports</a></li>
</ul>
</div>
<div>
<h4 class="text-primary font-bold mb-6 font-label-md">Legal</h4>
<ul class="space-y-3">
<li><a class="text-on-surface-variant hover:text-secondary transition-all duration-300 font-body-md" href="#">Terms of Service</a></li>
<li><a class="text-on-surface-variant hover:text-secondary transition-all duration-300 font-body-md" href="#">Privacy Policy</a></li>
<li><a class="text-on-surface-variant hover:text-secondary transition-all duration-300 font-body-md" href="#">Disclosures</a></li>
</ul>
</div>
</div>
<div class="max-w-container-max mx-auto px-gutter mt-12 pt-8 border-t border-outline-variant/10 flex flex-col md:flex-row justify-between items-center gap-4">
<p class="text-on-surface-variant text-body-md">© 2024 FundFlow. Decentralized &amp; Transparent.</p>
<div class="flex gap-6">
<a class="text-on-surface-variant hover:text-primary transition-colors" href="#"><span class="material-symbols-outlined">share</span></a>
<a class="text-on-surface-variant hover:text-primary transition-colors" href="#"><span class="material-symbols-outlined">hub</span></a>
<a class="text-on-surface-variant hover:text-primary transition-colors" href="#"><span class="material-symbols-outlined">groups</span></a>
</div>
</div>
</footer>
<script>
    // Micro-interaction for campaign cards
    document.querySelectorAll('.glass-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });
</script>
</body></html>

<!-- Milestone Escrow Dashboard -->
<!DOCTYPE html><html class="dark" lang="en"><head>
<meta charset="utf-8">
<meta content="width=device-width, initial-scale=1.0" name="viewport">
<title>FundFlow | Milestone Escrow Dashboard</title>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&amp;family=JetBrains+Mono:wght@400;500&amp;display=swap" rel="stylesheet">
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet">
<style>
        .glass-card {
            background: rgba(15, 23, 42, 0.7);
            backdrop-filter: blur(20px);
            border: 1px solid rgba(255, 255, 255, 0.1);
        }
        .inner-glow {
            box-shadow: inset 0 1px 0 0 rgba(255, 255, 255, 0.05);
        }
        .custom-scrollbar::-webkit-scrollbar {
            width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
            background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
            background: rgba(144, 143, 160, 0.2);
            border-radius: 10px;
        }
    </style>
<script id="tailwind-config">
      tailwind.config = {
        darkMode: "class",
        theme: {
          extend: {
            "colors": {
                    "primary-fixed-dim": "#c0c1ff",
                    "tertiary-container": "#009eb9",
                    "surface-container-highest": "#2d3449",
                    "surface-container-lowest": "#060e20",
                    "on-surface-variant": "#c7c4d7",
                    "background": "#0b1326",
                    "on-secondary-fixed": "#002113",
                    "surface-container-low": "#131b2e",
                    "surface": "#0b1326",
                    "surface-variant": "#2d3449",
                    "secondary-fixed-dim": "#4edea3",
                    "primary-fixed": "#e1e0ff",
                    "outline": "#908fa0",
                    "surface-dim": "#0b1326",
                    "surface-bright": "#31394d",
                    "on-error": "#690005",
                    "on-surface": "#dae2fd",
                    "on-tertiary-fixed-variant": "#004e5c",
                    "tertiary-fixed-dim": "#4cd7f6",
                    "on-secondary-container": "#00311f",
                    "outline-variant": "#464554",
                    "inverse-primary": "#494bd6",
                    "surface-container": "#171f33",
                    "on-primary-container": "#0d0096",
                    "on-primary-fixed-variant": "#2f2ebe",
                    "primary-container": "#8083ff",
                    "inverse-on-surface": "#283044",
                    "secondary-fixed": "#6ffbbe",
                    "tertiary": "#4cd7f6",
                    "on-tertiary": "#003640",
                    "on-error-container": "#ffdad6",
                    "surface-tint": "#c0c1ff",
                    "error": "#ffb4ab",
                    "on-background": "#dae2fd",
                    "primary": "#c0c1ff",
                    "on-tertiary-container": "#002f38",
                    "error-container": "#93000a",
                    "tertiary-fixed": "#acedff",
                    "on-primary": "#1000a9",
                    "on-primary-fixed": "#07006c",
                    "secondary-container": "#00a572",
                    "surface-container-high": "#222a3d",
                    "inverse-surface": "#dae2fd",
                    "secondary": "#4edea3",
                    "on-secondary-fixed-variant": "#005236",
                    "on-secondary": "#003824",
                    "on-tertiary-fixed": "#001f26"
            },
            "borderRadius": {
                    "DEFAULT": "0.25rem",
                    "lg": "0.5rem",
                    "xl": "0.75rem",
                    "full": "9999px"
            },
            "spacing": {
                    "gutter": "24px",
                    "xs": "4px",
                    "lg": "48px",
                    "sm": "12px",
                    "base": "8px",
                    "md": "24px",
                    "xl": "80px",
                    "container-max": "1280px"
            },
            "fontFamily": {
                    "headline-lg-mobile": ["Inter"],
                    "label-sm": ["JetBrains Mono"],
                    "headline-md": ["Inter"],
                    "headline-lg": ["Inter"],
                    "display-lg": ["Inter"],
                    "body-lg": ["Inter"],
                    "label-md": ["JetBrains Mono"],
                    "body-md": ["Inter"]
            },
            "fontSize": {
                    "headline-lg-mobile": ["24px", {"lineHeight": "1.2", "fontWeight": "600"}],
                    "label-sm": ["12px", {"lineHeight": "1.4", "fontWeight": "500"}],
                    "headline-md": ["24px", {"lineHeight": "1.3", "fontWeight": "600"}],
                    "headline-lg": ["32px", {"lineHeight": "1.2", "letterSpacing": "-0.01em", "fontWeight": "600"}],
                    "display-lg": ["48px", {"lineHeight": "1.1", "letterSpacing": "-0.02em", "fontWeight": "700"}],
                    "body-lg": ["18px", {"lineHeight": "1.6", "fontWeight": "400"}],
                    "label-md": ["14px", {"lineHeight": "1.4", "letterSpacing": "0.05em", "fontWeight": "500"}],
                    "body-md": ["16px", {"lineHeight": "1.5", "fontWeight": "400"}]
            }
          },
        },
      }
    </script>
</head>
<body class="bg-surface text-on-surface font-body-md overflow-hidden h-screen flex">
<!-- SideNavBar (Shared Component) -->
<aside class="h-screen w-64 fixed left-0 top-0 bg-surface-container-low/80 backdrop-blur-xl border-r border-outline-variant/20 shadow-lg flex flex-col py-6 gap-2 z-50">
<div class="px-6 mb-8">
<h1 class="font-headline-md text-headline-md font-bold text-primary tracking-tight">FundFlow</h1>
<p class="font-label-sm text-label-sm text-on-surface-variant opacity-70">Creator Hub</p>
</div>
<nav class="flex-1 flex flex-col gap-1">
<a class="text-on-surface-variant hover:bg-surface-variant/30 rounded-xl mx-2 px-4 py-3 flex items-center gap-3 transition-all hover:translate-x-1 duration-200 font-label-md text-label-md" href="#">
<span class="material-symbols-outlined">dashboard</span>
                Dashboard
            </a>
<a class="text-on-surface-variant hover:bg-surface-variant/30 rounded-xl mx-2 px-4 py-3 flex items-center gap-3 transition-all hover:translate-x-1 duration-200 font-label-md text-label-md" href="#">
<span class="material-symbols-outlined">account_tree</span>
                Milestones
            </a>
<!-- Active State: Escrow -->
<a class="bg-secondary-container text-on-secondary-container rounded-xl mx-2 px-4 py-3 flex items-center gap-3 font-label-md text-label-md" href="#">
<span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 1;">account_balance_wallet</span>
                Escrow
            </a>
<a class="text-on-surface-variant hover:bg-surface-variant/30 rounded-xl mx-2 px-4 py-3 flex items-center gap-3 transition-all hover:translate-x-1 duration-200 font-label-md text-label-md" href="#">
<span class="material-symbols-outlined">settings</span>
                Settings
            </a>
</nav>
<div class="px-4 mt-auto">
<button class="w-full bg-primary-container text-on-primary-container py-3 rounded-xl font-label-md text-label-md hover:opacity-90 active:scale-95 transition-all flex items-center justify-center gap-2">
<span class="material-symbols-outlined">add_circle</span>
                Launch New Project
            </button>
<div class="mt-6 flex items-center gap-3 px-2">
<div class="h-10 w-10 rounded-full bg-surface-variant flex items-center justify-center overflow-hidden border border-outline-variant/30">
<img alt="Creator Profile" class="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA9OBuXcZoM_qlZ46-goFVUz-rEyk1BLzqO1M_y6YVMGwi5gw8I98gPFL-Lks5WWJGowMMDE-LMbkXDa3zWHp4WsFQ0FUpjT-r7m4wJYkMfhaepRRyoYnf6-baokPVXJ90nKopxWKOBhBLtLSGDa8YuAY-EZrkBBlMU3qA_C97OQIInJIosJxFE63G0QyiTrgTBWqtM7-viQqsVrEtDFuLskOVbxsTGkS3Kbbm68aFMeSq1An1PwhCPNxSdkEzrOM8a1EYhMQP1gpCx">
</div>
<div class="overflow-hidden">
<p class="font-label-md text-label-md truncate">0x71...4A2d</p>
<p class="text-[10px] text-secondary flex items-center gap-1">
<span class="h-2 w-2 bg-secondary rounded-full animate-pulse"></span>
                        Connected
                    </p>
</div>
</div>
</div>
</aside>
<!-- Main Content Canvas -->
<main class="ml-64 flex-1 h-screen overflow-y-auto custom-scrollbar relative">
<div class="max-w-container-max mx-auto px-gutter py-xl relative z-10">
<!-- Header Section -->
<header class="flex justify-between items-end mb-lg">
<div>
<nav class="flex gap-2 text-on-surface-variant font-label-sm text-label-sm mb-2">
<span>Projects</span>
<span>/</span>
<span class="text-primary">Lagos Tech Hub Expansion</span>
</nav>
<h2 class="font-headline-lg text-headline-lg text-on-surface">Escrow Vault</h2>
</div>
<div class="flex gap-3">
<button class="bg-surface-container-high border border-outline-variant/30 text-on-surface px-4 py-2 rounded-lg font-label-md text-label-md hover:bg-surface-variant transition-colors flex items-center gap-2">
<span class="material-symbols-outlined">history</span>
                        Audit Log
                    </button>
<button class="bg-primary text-on-primary px-6 py-2 rounded-lg font-label-md text-label-md hover:opacity-90 transition-opacity flex items-center gap-2">
<span class="material-symbols-outlined">account_balance</span>
                        Withdraw Released
                    </button>
</div>
</header>
<!-- Top Grid: Escrow Overview & Progress -->
<div class="grid grid-cols-1 lg:grid-cols-12 gap-md mb-md">
<!-- Large Vault Card -->
<section class="lg:col-span-8 glass-card rounded-2xl p-md inner-glow relative overflow-hidden group">
<div class="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
<span class="material-symbols-outlined text-[120px]">verified_user</span>
</div>
<div class="grid grid-cols-1 md:grid-cols-2 gap-lg relative z-10">
<div>
<p class="font-label-md text-label-md text-on-surface-variant mb-1">Total Locked Value (TLV)</p>
<h3 class="font-display-lg text-display-lg text-on-surface mb-6">₦850,000,000 <span class="text-headline-md text-on-surface-variant font-medium">NGN</span></h3>
<div class="flex gap-gutter items-center mb-base">
<div class="flex-1 h-3 bg-surface-container-highest rounded-full overflow-hidden">
<div class="h-full bg-gradient-to-r from-tertiary to-secondary" style="width: 65%;"></div>
</div>
<span class="font-label-md text-label-md text-secondary ml-4">65% Released</span>
</div>
<p class="font-label-sm text-label-sm text-on-surface-variant">Next Release: ₦150,000,000 upon Milestone 3 approval.</p>
</div>
<div class="flex flex-col justify-between border-l border-outline-variant/20 pl-lg">
<div class="space-y-4">
<div class="flex justify-between items-center">
<span class="text-on-surface-variant">Funds Released</span>
<span class="text-secondary font-semibold">₦552,500,000</span>
</div>
<div class="flex justify-between items-center">
<span class="text-on-surface-variant">Pending Release</span>
<span class="text-primary font-semibold">₦297,500,000</span>
</div>
<div class="flex justify-between items-center">
<span class="text-on-surface-variant">Disputed Funds</span>
<span class="text-error font-semibold">₦0.00</span>
</div>
</div>
<div class="pt-4 mt-4 border-t border-outline-variant/20">
<div class="flex items-center gap-2 text-tertiary">
<span class="material-symbols-outlined text-sm">info</span>
<span class="font-label-sm text-label-sm">Smart Contract: 0x9f...E31b</span>
</div>
</div>
</div>
</div>
</section>
<!-- Project Quick Stats -->
<div class="lg:col-span-4 flex flex-col gap-md">
<div class="glass-card rounded-2xl p-md inner-glow flex-1 flex flex-col justify-center">
<p class="font-label-md text-label-md text-on-surface-variant">Backers Voting</p>
<div class="mt-2 flex items-baseline gap-2">
<h4 class="font-headline-lg text-headline-lg">1,422</h4>
<span class="text-secondary font-label-md">+12 this week</span>
</div>
<div class="mt-4 flex -space-x-2">
<img alt="Backer" class="w-8 h-8 rounded-full border-2 border-surface" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBsvi2Mb7je66u1gPknYY9VTiPv3GWLptKi_mLNi37r0ylmFfyh2kjKfGih3255o1gWouC2jyUcto5cJM_RpplOOg8qh2J6pPNSqHo8erLfQ0_sPco9Tf70MHYb_N60ol_SQVw_xYft7uP2tAh2MNzBx8KNVW_tuYOeh7imPFcXeg4Mg0Gmg3nVMLkN7ye7qus3Md5zdoAkNZzy4RCsbMXnO-xf_WD_azRN9pjysORZD4qmKyhxAutlnQwrjNnCslzEu7wVSP2Yme6X">
<img alt="Backer" class="w-8 h-8 rounded-full border-2 border-surface" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAqP3UTnrjGuOwGJqdKPgpGF1PnDw8hTrMSuszFDX3vurHb24NGHqzH-5-9juim63x4o2l3v8yq4S_WeEK1LDM9E17Phk4WQ66r0vSFdGjlaZ_ZwEeGGChbJtR1ApzegwsXg5kWyZ3MzK7kmph-bTUn2LBYAIWQ-292km0WfuJhHwchIOO77AvaHoSTZlOrOBPY_U-skNxUlMh8_SoInrCHMkZYaxqGUqfQ4he4Z9mMvbhrCt0NQ3cdvoS9GzmJ-UHbsTWbMcYWlfou">
<img alt="Backer" class="w-8 h-8 rounded-full border-2 border-surface" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB5pYjzFqjo8F8a40f-vhU8dnhbKJ5wYx8_7mybEADN2QxDpyI2WwabowYb3VLq-Oygr_MCGCAepSoeccxsEpVbSccCBjywxSVTIovwsCUn86ja5fl-p5ayhqxKbS5aVzocQK_A5F7hqa4PHoyNny6ygKRkkvp0riVbFytcgXKMmVMHcDf7BfuPBg0YPNB1LItC2oEeczHeFetlm-CH6_QJMAl_qDlW4oTOVIR99RmX-ASc-GUriO3L3fsr1Q-xN3GC8SJD95rgs7q2">
<div class="w-8 h-8 rounded-full bg-surface-container-highest border-2 border-surface flex items-center justify-center text-[10px] font-bold">+1.4k</div>
</div>
</div>
<div class="glass-card rounded-2xl p-md inner-glow flex-1 flex flex-col justify-center">
<p class="font-label-md text-label-md text-on-surface-variant">Network Status</p>
<div class="mt-2 flex items-center gap-3">
<div class="h-10 w-10 rounded-lg bg-surface-container-highest flex items-center justify-center">
<span class="material-symbols-outlined text-primary">lan</span>
</div>
<div>
<h4 class="font-label-md text-label-md text-on-surface">Polygon Mainnet</h4>
<p class="font-label-sm text-label-sm text-secondary">Block Sync: 100%</p>
</div>
</div>
</div>
</div>
</div>
<!-- Visual Progress Track -->
<section class="mb-md glass-card rounded-2xl p-6 inner-glow overflow-x-auto">
<div class="min-w-[800px] flex items-center justify-between relative px-4">
<!-- Progress Line Background -->
<div class="absolute top-1/2 left-0 right-0 h-0.5 bg-surface-container-highest -translate-y-1/2 z-0"></div>
<!-- Active Progress Line -->
<div class="absolute top-1/2 left-0 h-0.5 bg-gradient-to-r from-secondary to-primary -translate-y-1/2 z-0" style="width: 70%;"></div>
<!-- Step 1: Created -->
<div class="relative z-10 flex flex-col items-center gap-3">
<div class="h-10 w-10 rounded-full bg-secondary text-on-secondary flex items-center justify-center shadow-lg shadow-secondary/20">
<span class="material-symbols-outlined text-xl">check</span>
</div>
<div class="text-center">
<p class="font-label-md text-label-md text-on-surface">Campaign Created</p>
<p class="font-label-sm text-label-sm text-on-surface-variant">Jan 12, 2024</p>
</div>
</div>
<!-- Step 2: Milestone 1 -->
<div class="relative z-10 flex flex-col items-center gap-3">
<div class="h-10 w-10 rounded-full bg-secondary text-on-secondary flex items-center justify-center shadow-lg shadow-secondary/20">
<span class="material-symbols-outlined text-xl">check</span>
</div>
<div class="text-center">
<p class="font-label-md text-label-md text-on-surface">Space Acquired</p>
<p class="font-label-sm text-label-sm text-on-surface-variant">Feb 28, 2024</p>
</div>
</div>
<!-- Step 3: Milestone 2 -->
<div class="relative z-10 flex flex-col items-center gap-3">
<div class="h-10 w-10 rounded-full bg-primary text-on-primary flex items-center justify-center shadow-lg shadow-primary/20 ring-4 ring-primary/10">
<span class="material-symbols-outlined text-xl">sync</span>
</div>
<div class="text-center">
<p class="font-label-md text-label-md text-primary font-bold">Tech Fit-out</p>
<p class="font-label-sm text-label-sm text-on-surface-variant">In Progress</p>
</div>
</div>
<!-- Step 4: Milestone 3 -->
<div class="relative z-10 flex flex-col items-center gap-3">
<div class="h-10 w-10 rounded-full bg-surface-container-highest text-on-surface-variant flex items-center justify-center">
<span class="material-symbols-outlined text-xl">pending</span>
</div>
<div class="text-center opacity-50">
<p class="font-label-md text-label-md text-on-surface">Grand Opening</p>
<p class="font-label-sm text-label-sm text-on-surface-variant">Est. June 15</p>
</div>
</div>
<!-- Step 5: Complete -->
<div class="relative z-10 flex flex-col items-center gap-3">
<div class="h-10 w-10 rounded-full bg-surface-container-highest text-on-surface-variant flex items-center justify-center border-2 border-dashed border-outline-variant/30">
<span class="material-symbols-outlined text-xl">flag</span>
</div>
<div class="text-center opacity-50">
<p class="font-label-md text-label-md text-on-surface">Full Capacity</p>
<p class="font-label-sm text-label-sm text-on-surface-variant">Completion</p>
</div>
</div>
</div>
</section>
<!-- Milestone Status Grid -->
<div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-md">
<!-- Milestone Card 1 -->
<div class="glass-card rounded-2xl overflow-hidden inner-glow flex flex-col">
<div class="p-md border-b border-outline-variant/10 flex justify-between items-start">
<div>
<span class="bg-secondary/10 text-secondary px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider mb-2 inline-block">Funds Released</span>
<h5 class="font-headline-md text-headline-md text-on-surface">M1: Infrastructure</h5>
</div>
<div class="h-8 w-8 rounded-full bg-secondary/20 flex items-center justify-center">
<span class="material-symbols-outlined text-secondary text-sm">verified</span>
</div>
</div>
<div class="p-md flex-1">
<p class="text-on-surface-variant font-body-md mb-4 line-clamp-2">Securing physical location in Lagos and completing structural surveys and initial tech audits.</p>
<div class="space-y-3">
<div class="flex justify-between text-label-sm font-label-sm">
<span class="text-on-surface-variant">Approval Weight</span>
<span class="text-on-surface">94.2%</span>
</div>
<div class="w-full h-1.5 bg-surface-container-highest rounded-full overflow-hidden">
<div class="h-full bg-secondary" style="width: 94.2%;"></div>
</div>
</div>
</div>
<div class="bg-surface-variant/20 p-4 mt-auto">
<p class="text-on-surface font-label-sm text-label-sm flex items-center justify-between">
<span>Amount: ₦150,000,000</span>
<span class="text-secondary flex items-center gap-1">Paid <span class="material-symbols-outlined text-xs">done_all</span></span>
</p>
</div>
</div>
<!-- Milestone Card 2: ACTIVE -->
<div class="glass-card rounded-2xl overflow-hidden inner-glow flex flex-col ring-2 ring-primary/40 relative">
<div class="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-on-primary px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-lg z-20">Current Milestone</div>
<div class="p-md border-b border-outline-variant/10 flex justify-between items-start">
<div>
<span class="bg-primary/10 text-primary px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider mb-2 inline-block">Voting Active</span>
<h5 class="font-headline-md text-headline-md text-on-surface">M2: Hub Fit-out</h5>
</div>
<div class="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center animate-pulse">
<span class="material-symbols-outlined text-primary text-sm">how_to_vote</span>
</div>
</div>
<div class="p-md flex-1">
<p class="text-on-surface-variant font-body-md mb-4 line-clamp-2">Installation of server racks, high-speed fiber connectivity, and dedicated workspace equipment.</p>
<div class="space-y-3">
<div class="flex justify-between text-label-sm font-label-sm">
<span class="text-on-surface-variant">Current Approval</span>
<span class="text-primary font-bold">68.5% <span class="text-on-surface-variant font-normal">/ 75% needed</span></span>
</div>
<div class="w-full h-1.5 bg-surface-container-highest rounded-full overflow-hidden">
<div class="h-full bg-primary" style="width: 68.5%;"></div>
</div>
</div>
<div class="mt-6 flex gap-2">
<button class="flex-1 border border-primary text-primary hover:bg-primary/10 py-2 rounded-lg font-label-md text-label-md transition-colors">Submit Proof</button>
<button class="flex-1 bg-primary text-on-primary py-2 rounded-lg font-label-md text-label-md shadow-lg shadow-primary/20">Claim Early</button>
</div>
</div>
<div class="bg-surface-variant/20 p-4 mt-auto">
<p class="text-on-surface font-label-sm text-label-sm flex items-center justify-between">
<span>Amount: ₦250,000,000</span>
<span class="text-primary flex items-center gap-1 italic">Pending...</span>
</p>
</div>
</div>
<!-- Milestone Card 3: UPCOMING -->
<div class="glass-card rounded-2xl overflow-hidden inner-glow flex flex-col opacity-60 hover:opacity-100 transition-opacity">
<div class="p-md border-b border-outline-variant/10 flex justify-between items-start">
<div>
<span class="bg-surface-container-highest text-on-surface-variant px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider mb-2 inline-block">Scheduled</span>
<h5 class="font-headline-md text-headline-md text-on-surface">M3: Expansion Launch</h5>
</div>
<div class="h-8 w-8 rounded-full bg-surface-container-highest flex items-center justify-center">
<span class="material-symbols-outlined text-on-surface-variant text-sm">lock</span>
</div>
</div>
<div class="p-md flex-1">
<p class="text-on-surface-variant font-body-md mb-4 line-clamp-2">Official opening ceremony and onboarding the first cohort of 100+ local tech startups.</p>
<div class="space-y-3">
<div class="flex justify-between text-label-sm font-label-sm">
<span class="text-on-surface-variant">Prerequisites</span>
<span class="text-on-surface">0/2 Completed</span>
</div>
<div class="w-full h-1.5 bg-surface-container-highest rounded-full overflow-hidden">
<div class="h-full bg-outline-variant" style="width: 0%;"></div>
</div>
</div>
</div>
<div class="bg-surface-variant/20 p-4 mt-auto">
<p class="text-on-surface font-label-sm text-label-sm flex items-center justify-between">
<span>Amount: ₦450,000,000</span>
<span class="text-on-surface-variant">Locked</span>
</p>
</div>
</div>
</div>
<!-- Detailed Data Table Section -->
<section class="mt-xl glass-card rounded-2xl overflow-hidden inner-glow">
<div class="px-md py-6 border-b border-outline-variant/10 flex items-center justify-between">
<h3 class="font-headline-md text-headline-md text-on-surface">Recent Escrow Activity</h3>
<div class="flex gap-4">
<div class="relative">
<span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-sm">search</span>
<input class="bg-surface-container-high border border-outline-variant/20 rounded-lg pl-10 pr-4 py-2 font-label-sm text-label-sm text-on-surface focus:outline-none focus:ring-2 ring-primary/50 transition-all" placeholder="Filter by tx hash..." type="text">
</div>
<button class="bg-surface-container-highest p-2 rounded-lg text-on-surface-variant hover:text-on-surface">
<span class="material-symbols-outlined">filter_list</span>
</button>
</div>
</div>
<table class="w-full text-left">
<thead>
<tr class="bg-surface-container-low text-on-surface-variant font-label-md text-label-md">
<th class="px-md py-4 font-semibold">Activity</th>
<th class="px-md py-4 font-semibold">Status</th>
<th class="px-md py-4 font-semibold">Milestone</th>
<th class="px-md py-4 font-semibold">Value</th>
<th class="px-md py-4 font-semibold text-right">Transaction</th>
</tr>
</thead>
<tbody class="divide-y divide-outline-variant/10 font-body-md text-body-md">
<tr class="hover:bg-surface-variant/20 transition-colors">
<td class="px-md py-5">
<div class="flex items-center gap-3">
<div class="h-8 w-8 rounded-full bg-secondary/10 flex items-center justify-center">
<span class="material-symbols-outlined text-secondary text-sm">north_east</span>
</div>
<span>Milestone Payout</span>
</div>
</td>
<td class="px-md py-5">
<span class="bg-secondary-container/20 text-secondary-fixed-dim border border-secondary/20 px-3 py-1 rounded-full text-xs">Completed</span>
</td>
<td class="px-md py-5">Infrastructure Setup</td>
<td class="px-md py-5 font-medium">₦150,000,000</td>
<td class="px-md py-5 text-right font-label-sm text-label-sm text-primary">0x442...99d1 <span class="material-symbols-outlined text-xs align-middle ml-1">open_in_new</span></td>
</tr>
<tr class="hover:bg-surface-variant/20 transition-colors">
<td class="px-md py-5">
<div class="flex items-center gap-3">
<div class="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
<span class="material-symbols-outlined text-primary text-sm">how_to_vote</span>
</div>
<span>Governance Vote Start</span>
</div>
</td>
<td class="px-md py-5">
<span class="bg-primary-container/20 text-primary-fixed-dim border border-primary/20 px-3 py-1 rounded-full text-xs">In Progress</span>
</td>
<td class="px-md py-5">Hub Fit-out</td>
<td class="px-md py-5 font-medium">₦250,000,000</td>
<td class="px-md py-5 text-right font-label-sm text-label-sm text-primary">0x811...bb34 <span class="material-symbols-outlined text-xs align-middle ml-1">open_in_new</span></td>
</tr>
<tr class="hover:bg-surface-variant/20 transition-colors">
<td class="px-md py-5">
<div class="flex items-center gap-3">
<div class="h-8 w-8 rounded-full bg-surface-container-highest flex items-center justify-center">
<span class="material-symbols-outlined text-on-surface-variant text-sm">add_task</span>
</div>
<span>Milestone Proof Upload</span>
</div>
</td>
<td class="px-md py-5">
<span class="bg-surface-container-highest text-on-surface-variant border border-outline-variant/20 px-3 py-1 rounded-full text-xs">Verification</span>
</td>
<td class="px-md py-5">Hub Fit-out</td>
<td class="px-md py-5 font-medium">-</td>
<td class="px-md py-5 text-right font-label-sm text-label-sm text-primary">0xee4...a101 <span class="material-symbols-outlined text-xs align-middle ml-1">open_in_new</span></td>
</tr>
</tbody>
</table>
</section>
</div>
<!-- Footer (Shared Component) -->
<footer class="w-full py-12 bg-surface-container-lowest border-t border-outline-variant/20">
<div class="max-w-container-max mx-auto px-gutter grid grid-cols-1 md:grid-cols-4 gap-lg items-start">
<div class="col-span-1">
<h4 class="font-headline-md text-headline-md text-on-surface mb-2">FundFlow</h4>
<p class="font-body-md text-body-md text-on-surface-variant">Decentralized &amp; Transparent crowdfunding platform for visionary builders.</p>
</div>
<div>
<h5 class="font-label-md text-label-md text-tertiary mb-4">Platform</h5>
<ul class="space-y-2 font-body-md text-body-md text-on-surface-variant">
<li><a class="hover:text-secondary hover:underline transition-all" href="#">Explore</a></li>
<li><a class="hover:text-secondary hover:underline transition-all" href="#">Launch</a></li>
<li><a class="hover:text-secondary hover:underline transition-all" href="#">Stats</a></li>
</ul>
</div>
<div>
<h5 class="font-label-md text-label-md text-tertiary mb-4">Resources</h5>
<ul class="space-y-2 font-body-md text-body-md text-on-surface-variant">
<li><a class="hover:text-secondary hover:underline transition-all" href="#">Docs</a></li>
<li><a class="hover:text-secondary hover:underline transition-all" href="#">Privacy</a></li>
<li><a class="hover:text-secondary hover:underline transition-all" href="#">Terms</a></li>
</ul>
</div>
<div>
<h5 class="font-label-md text-label-md text-tertiary mb-4">Support</h5>
<ul class="space-y-2 font-body-md text-body-md text-on-surface-variant">
<li><a class="hover:text-secondary hover:underline transition-all" href="#">Help Center</a></li>
<li><a class="hover:text-secondary hover:underline transition-all" href="#">Community</a></li>
<li><a class="hover:text-secondary hover:underline transition-all" href="#">Audit Logs</a></li>
</ul>
</div>
</div>
<div class="max-w-container-max mx-auto px-gutter mt-12 pt-8 border-t border-outline-variant/10 text-center">
<p class="text-on-surface-variant font-label-sm text-label-sm">© 2024 FundFlow. Decentralized &amp; Transparent. Built on Ethereum &amp; Polygon.</p>
</div>
</footer>
</main>
<script>
        // Simple micro-interaction for cards
        document.querySelectorAll('.glass-card').forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-2px)';
                card.style.transition = 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)';
            });
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0px)';
            });
        });

        // Dashboard live update simulation
        setInterval(() => {
            const votingPercent = document.querySelector('.text-primary.font-bold');
            if (votingPercent) {
                let currentVal = parseFloat(votingPercent.innerText);
                let newVal = (currentVal + (Math.random() * 0.05)).toFixed(1);
                votingPercent.innerHTML = `${newVal}% <span class="text-on-surface-variant font-normal">/ 75% needed</span>`;
            }
        }, 5000);
    </script>
</body></html>

<!-- Launch Campaign Wizard -->
<!DOCTYPE html><html class="dark" lang="en"><head>
<meta charset="utf-8">
<meta content="width=device-width, initial-scale=1.0" name="viewport">
<title>FundFlow | Create Campaign</title>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&amp;family=JetBrains+Mono:wght@400;500&amp;family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet">
<style>
    .material-symbols-outlined {
      font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
    }
    .glass-morphism {
      background: rgba(15, 23, 42, 0.7);
      backdrop-filter: blur(20px);
      border: 1px solid rgba(255, 255, 255, 0.1);
    }
    .glass-morphism-header {
      background: rgba(11, 19, 38, 0.7);
      backdrop-filter: blur(12px);
    }
    .inner-glow {
      box-shadow: inset 0 1px 0 0 rgba(255, 255, 255, 0.05);
    }
    .milestone-track {
      background: linear-gradient(to bottom, #494bd6, #4edea3);
    }
    input::placeholder {
      color: #908fa0;
    }
    .step-active {
      color: #c0c1ff;
      border-bottom: 2px solid #c0c1ff;
    }
  </style>
<script id="tailwind-config">
    tailwind.config = {
      darkMode: "class",
      theme: {
        extend: {
          "colors": {
                  "primary-fixed-dim": "#c0c1ff",
                  "tertiary-container": "#009eb9",
                  "surface-container-highest": "#2d3449",
                  "surface-container-lowest": "#060e20",
                  "on-surface-variant": "#c7c4d7",
                  "background": "#0b1326",
                  "on-secondary-fixed": "#002113",
                  "surface-container-low": "#131b2e",
                  "surface": "#0b1326",
                  "surface-variant": "#2d3449",
                  "secondary-fixed-dim": "#4edea3",
                  "primary-fixed": "#e1e0ff",
                  "outline": "#908fa0",
                  "surface-dim": "#0b1326",
                  "surface-bright": "#31394d",
                  "on-error": "#690005",
                  "on-surface": "#dae2fd",
                  "on-tertiary-fixed-variant": "#004e5c",
                  "tertiary-fixed-dim": "#4cd7f6",
                  "on-secondary-container": "#00311f",
                  "outline-variant": "#464554",
                  "inverse-primary": "#494bd6",
                  "surface-container": "#171f33",
                  "on-primary-container": "#0d0096",
                  "on-primary-fixed-variant": "#2f2ebe",
                  "primary-container": "#8083ff",
                  "inverse-on-surface": "#283044",
                  "secondary-fixed": "#6ffbbe",
                  "tertiary": "#4cd7f6",
                  "on-tertiary": "#003640",
                  "on-error-container": "#ffdad6",
                  "surface-tint": "#c0c1ff",
                  "error": "#ffb4ab",
                  "on-background": "#dae2fd",
                  "primary": "#c0c1ff",
                  "on-tertiary-container": "#002f38",
                  "error-container": "#93000a",
                  "tertiary-fixed": "#acedff",
                  "on-primary": "#1000a9",
                  "on-primary-fixed": "#07006c",
                  "secondary-container": "#00a572",
                  "surface-container-high": "#222a3d",
                  "inverse-surface": "#dae2fd",
                  "secondary": "#4edea3",
                  "on-secondary-fixed-variant": "#005236",
                  "on-secondary": "#003824",
                  "on-tertiary-fixed": "#001f26"
          },
          "borderRadius": {
                  "DEFAULT": "0.25rem",
                  "lg": "0.5rem",
                  "xl": "0.75rem",
                  "full": "9999px"
          },
          "spacing": {
                  "gutter": "24px",
                  "xs": "4px",
                  "lg": "48px",
                  "sm": "12px",
                  "base": "8px",
                  "md": "24px",
                  "xl": "80px",
                  "container-max": "1280px"
          },
          "fontFamily": {
                  "headline-lg-mobile": ["Inter"],
                  "label-sm": ["JetBrains Mono"],
                  "headline-md": ["Inter"],
                  "headline-lg": ["Inter"],
                  "display-lg": ["Inter"],
                  "body-lg": ["Inter"],
                  "label-md": ["JetBrains Mono"],
                  "body-md": ["Inter"]
          },
          "fontSize": {
                  "headline-lg-mobile": ["24px", {"lineHeight": "1.2", "fontWeight": "600"}],
                  "label-sm": ["12px", {"lineHeight": "1.4", "fontWeight": "500"}],
                  "headline-md": ["24px", {"lineHeight": "1.3", "fontWeight": "600"}],
                  "headline-lg": ["32px", {"lineHeight": "1.2", "letterSpacing": "-0.01em", "fontWeight": "600"}],
                  "display-lg": ["48px", {"lineHeight": "1.1", "letterSpacing": "-0.02em", "fontWeight": "700"}],
                  "body-lg": ["18px", {"lineHeight": "1.6", "fontWeight": "400"}],
                  "label-md": ["14px", {"lineHeight": "1.4", "letterSpacing": "0.05em", "fontWeight": "500"}],
                  "body-md": ["16px", {"lineHeight": "1.5", "fontWeight": "400"}]
          }
        },
      },
    }
  </script>
</head>
<body class="bg-surface text-on-surface font-body-md selection:bg-primary-container selection:text-on-primary-container overflow-x-hidden">
<!-- TopNavBar (Shared Component) -->
<nav class="fixed top-0 w-full z-50 bg-surface/70 backdrop-blur-md border-b border-outline-variant/30 shadow-sm">
<div class="flex justify-between items-center w-full px-gutter max-w-container-max mx-auto h-20">
<div class="flex items-center gap-md">
<span class="font-headline-md text-headline-md font-bold text-on-surface tracking-tight">FundFlow</span>
<div class="hidden md:flex gap-md ml-lg">
<a class="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-colors" href="#">Explore</a>
<a class="font-body-md text-body-md text-primary font-bold border-b-2 border-primary pb-1" href="#">Launch</a>
</div>
</div>
<div class="flex items-center gap-base">
<button class="material-symbols-outlined p-base text-on-surface-variant hover:bg-surface-variant/50 rounded-full transition-all">notifications</button>
<div class="flex items-center gap-sm bg-surface-container-high px-4 py-2 rounded-full border border-outline-variant/30">
<div class="w-2 h-2 rounded-full bg-secondary"></div>
<span class="font-label-md text-label-md text-on-surface">0x71...C42D</span>
<img alt="User profile and wallet status" class="w-6 h-6 rounded-full ml-xs" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDJnwUEtSlrunGbIdDHovPjU3h5IzdFM2vQKyZthNSCEmjCKWr_fJOt146ayXpl_-r_f6Pqaj9LUpcK8K1BYrb-MK6Dt7e3TMjplJaQGBW661GZKMeidLN6uDoWHeU78rOQm5ZDD4V4cCJdM69FfmKWix5PB_0zLCOJQ0CWbnql-EYK00OpI3Dw2BikQIT-sVcQhbp-BBaK1A1bh6G6aWfpoGCdn13cyUvO_lIQf0Niqxr2QfDvpYHL_ofz-JlQA4B7ExBuI95mMhx0">
</div>
</div>
</div>
</nav>
<!-- Main Content Area -->
<main class="pt-32 pb-xl px-gutter max-w-container-max mx-auto min-h-screen">
<!-- Step Indicator -->
<header class="mb-xl text-center max-w-2xl mx-auto">
<h1 class="font-headline-lg text-headline-lg text-on-surface mb-md">Bring your vision to life</h1>
<div class="flex justify-between items-center relative mt-lg px-xs">
<!-- Progress Line -->
<div class="absolute top-1/2 left-0 w-full h-[2px] bg-surface-container-highest -z-10 -translate-y-1/2"></div>
<div class="absolute top-1/2 left-0 w-2/3 h-[2px] bg-primary -z-10 -translate-y-1/2 transition-all duration-500"></div>
<div class="flex flex-col items-center gap-xs">
<div class="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-on-primary">
<span class="material-symbols-outlined text-[18px]" style="font-variation-settings: 'FILL' 1;">check</span>
</div>
<span class="font-label-sm text-label-sm text-on-surface-variant">Campaign Info</span>
</div>
<div class="flex flex-col items-center gap-xs">
<div class="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-on-primary">
<span class="material-symbols-outlined text-[18px]" style="font-variation-settings: 'FILL' 1;">check</span>
</div>
<span class="font-label-sm text-label-sm text-on-surface-variant">Funding</span>
</div>
<div class="flex flex-col items-center gap-xs">
<div class="w-10 h-10 rounded-full bg-primary-container border-4 border-surface flex items-center justify-center text-on-primary-container ring-2 ring-primary">
<span class="font-label-md text-label-md">3</span>
</div>
<span class="font-label-sm text-label-sm text-primary font-bold">Milestones</span>
</div>
<div class="flex flex-col items-center gap-xs">
<div class="w-8 h-8 rounded-full bg-surface-container-highest flex items-center justify-center text-on-surface-variant">
<span class="font-label-sm text-label-sm">4</span>
</div>
<span class="font-label-sm text-label-sm text-on-surface-variant">Review</span>
</div>
</div>
</header>
<div class="grid grid-cols-1 lg:grid-cols-12 gap-lg items-start">
<!-- Left: Form Section -->
<section class="lg:col-span-7 space-y-md">
<div class="glass-morphism p-md rounded-xl inner-glow">
<h2 class="font-headline-md text-headline-md text-primary-fixed-dim mb-xs">Define Next Milestone</h2>
<p class="font-body-md text-body-md text-on-surface-variant mb-lg">Milestones ensure transparency. Funds are only released when milestones are voted successful by your backers.</p>
<form class="space-y-md" id="milestone-form">
<div class="grid grid-cols-1 md:grid-cols-2 gap-md">
<div class="space-y-xs md:col-span-2">
<label class="font-label-md text-label-md text-on-surface-variant" for="m-title">Milestone Title</label>
<input class="w-full bg-surface-container-low border border-outline-variant/30 rounded-lg px-md py-3 text-on-surface focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all" id="m-title" placeholder="e.g., Solar Array Procurement" type="text">
</div>
<div class="space-y-xs">
<label class="font-label-md text-label-md text-on-surface-variant" for="m-amount">Release Amount (₦)</label>
<div class="relative">
<input class="w-full bg-surface-container-low border border-outline-variant/30 rounded-lg pl-md pr-12 py-3 text-on-surface focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all" id="m-amount" placeholder="0.00" step="0.01" type="number">
<span class="absolute right-4 top-1/2 -translate-y-1/2 font-label-md text-label-md text-on-surface-variant">₦</span>
</div>
</div>
<div class="space-y-xs">
<label class="font-label-md text-label-md text-on-surface-variant" for="m-date">Target Completion Date</label>
<input class="w-full bg-surface-container-low border border-outline-variant/30 rounded-lg px-md py-3 text-on-surface focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all [color-scheme:dark]" id="m-date" type="date">
</div>
<div class="space-y-xs md:col-span-2">
<label class="font-label-md text-label-md text-on-surface-variant" for="m-desc">Description &amp; Deliverables</label>
<textarea class="w-full bg-surface-container-low border border-outline-variant/30 rounded-lg px-md py-3 text-on-surface focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all resize-none" id="m-desc" placeholder="Detail the specific deliverables for the solar grid installation in Lagos..." rows="4"></textarea>
</div>
</div>
<button class="w-full py-4 rounded-xl font-label-md text-label-md bg-surface-container-high text-primary border border-primary/30 hover:bg-primary/10 transition-all flex items-center justify-center gap-sm" onclick="addMilestone()" type="button">
<span class="material-symbols-outlined">add_circle</span>
              Add Milestone to Timeline
            </button>
</form>
</div>
<!-- Navigation Buttons -->
<div class="flex items-center justify-between pt-md">
<button class="px-lg py-4 rounded-xl font-label-md text-label-md text-on-surface-variant hover:bg-surface-variant/30 transition-all">Back: Funding</button>
<a class="px-xl py-4 rounded-xl font-label-md text-label-md bg-gradient-to-r from-primary-container to-secondary-container text-on-primary-container font-bold shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all" href="#">Continue to Review</a>
</div>
</section>
<!-- Right: Visual Timeline Preview -->
<aside class="lg:col-span-5">
<div class="glass-morphism p-md rounded-xl inner-glow sticky top-24">
<div class="flex items-center justify-between mb-lg">
<h3 class="font-headline-md text-headline-md text-on-surface">Timeline Preview</h3>
<span class="px-3 py-1 rounded-full bg-secondary/10 text-secondary font-label-sm text-label-sm border border-secondary/20">Solar Grid Phase 1</span>
</div>
<div class="relative pl-base">
<!-- Vertical Line -->
<div class="absolute left-gutter top-4 bottom-4 w-px bg-outline-variant/30"></div>
<div class="space-y-lg relative" id="milestone-list">
<!-- Milestone 1 -->
<div class="flex gap-md group">
<div class="relative z-10 w-10 flex flex-col items-center">
<div class="w-5 h-5 rounded-full bg-secondary-container border-4 border-surface ring-1 ring-secondary group-hover:scale-125 transition-transform duration-300"></div>
</div>
<div class="flex-1 glass-morphism p-4 rounded-lg bg-surface-container-highest/40 group-hover:bg-surface-container-highest/60 transition-all">
<div class="flex justify-between items-start mb-xs">
<span class="font-label-md text-label-md text-secondary">Milestone 1</span>
<span class="font-label-sm text-label-sm text-on-surface-variant">Dec 2024</span>
</div>
<h4 class="font-headline-md text-body-lg text-on-surface font-semibold mb-xs">Site Assessment &amp; Permitting</h4>
<p class="font-body-md text-body-md text-on-surface-variant text-sm mb-base">Completion of technical surveys and acquisition of regulatory approvals from Lagos State Electricity Board.</p>
<div class="flex items-center gap-sm">
<span class="material-symbols-outlined text-sm text-tertiary">account_balance_wallet</span>
<span class="font-label-sm text-label-sm text-on-surface">₦ 12,500,000.00</span>
</div>
</div>
</div>
<!-- Milestone 2 -->
<div class="flex gap-md group">
<div class="relative z-10 w-10 flex flex-col items-center">
<div class="w-5 h-5 rounded-full bg-primary-container border-4 border-surface ring-1 ring-primary group-hover:scale-125 transition-transform duration-300"></div>
</div>
<div class="flex-1 glass-morphism p-4 rounded-lg bg-surface-container-highest/40 group-hover:bg-surface-container-highest/60 transition-all">
<div class="flex justify-between items-start mb-xs">
<span class="font-label-md text-label-md text-primary">Milestone 2</span>
<span class="font-label-sm text-label-sm text-on-surface-variant">Mar 2025</span>
</div>
<h4 class="font-headline-md text-body-lg text-on-surface font-semibold mb-xs">Infrastructure &amp; Logistics</h4>
<p class="font-body-md text-body-md text-on-surface-variant text-sm mb-base">Shipping of PV modules and batteries to Nigeria. On-site preparation for micro-grid housing.</p>
<div class="flex items-center gap-sm">
<span class="material-symbols-outlined text-sm text-tertiary">account_balance_wallet</span>
<span class="font-label-sm text-label-sm text-on-surface">₦ 25,000,000.00</span>
</div>
</div>
</div>
<!-- Empty State / Current Input Placeholder -->
<div class="flex gap-md opacity-40" id="timeline-placeholder">
<div class="relative z-10 w-10 flex flex-col items-center">
<div class="w-5 h-5 rounded-full border-2 border-dashed border-outline-variant bg-surface"></div>
</div>
<div class="flex-1 border-2 border-dashed border-outline-variant/30 p-4 rounded-lg">
<p class="font-label-sm text-label-sm text-center py-2 text-on-surface-variant">Adding new project milestone...</p>
</div>
</div>
</div>
</div>
<div class="mt-xl p-md rounded-xl bg-primary/5 border border-primary/10">
<div class="flex items-start gap-sm">
<span class="material-symbols-outlined text-primary">info</span>
<div>
<p class="font-label-md text-label-md text-on-surface font-bold mb-xs">Release Logic</p>
<p class="font-body-md text-sm text-on-surface-variant">Funds are locked in a non-custodial escrow contract. Localized proof-of-work (photos, IoT data, or audit logs) must be verified by the community.</p>
</div>
</div>
</div>
</div>
</aside>
</div>
</main>
<!-- Footer (Shared Component) -->
<footer class="w-full py-12 bg-surface-container-lowest border-t border-outline-variant/20">
<div class="max-w-container-max mx-auto px-gutter grid grid-cols-1 md:grid-cols-4 gap-lg">
<div class="col-span-1 md:col-span-1">
<span class="font-headline-md text-headline-md text-on-surface font-bold">FundFlow</span>
<p class="mt-md text-on-surface-variant font-body-md text-body-md">Building the future of decentralized capital management.</p>
</div>
<div>
<h4 class="font-label-md text-label-md text-on-surface mb-md">Protocol</h4>
<ul class="space-y-sm">
<li><a class="font-body-md text-body-md text-on-surface-variant hover:text-secondary transition-all hover:underline decoration-secondary" href="#">Terms</a></li>
<li><a class="font-body-md text-body-md text-on-surface-variant hover:text-secondary transition-all hover:underline decoration-secondary" href="#">Privacy</a></li>
</ul>
</div>
<div>
<h4 class="font-label-md text-label-md text-on-surface mb-md">Resources</h4>
<ul class="space-y-sm">
<li><a class="font-body-md text-body-md text-on-surface-variant hover:text-secondary transition-all hover:underline decoration-secondary" href="#">Docs</a></li>
<li><a class="font-body-md text-body-md text-on-surface-variant hover:text-secondary transition-all hover:underline decoration-secondary" href="#">Support</a></li>
</ul>
</div>
<div class="flex flex-col justify-between">
<p class="font-body-md text-body-md text-on-surface-variant">© 2024 FundFlow. Decentralized &amp; Transparent.</p>
<div class="flex gap-md mt-md">
<span class="material-symbols-outlined text-on-surface-variant hover:text-primary cursor-pointer">language</span>
<span class="material-symbols-outlined text-on-surface-variant hover:text-primary cursor-pointer">hub</span>
</div>
</div>
</div>
</footer>
<script>
    let milestoneCount = 2;

    function addMilestone() {
      const title = document.getElementById('m-title').value;
      const amount = document.getElementById('m-amount').value;
      const dateVal = document.getElementById('m-date').value;
      const desc = document.getElementById('m-desc').value;

      if (!title || !amount) {
        alert('Please provide at least a title and release amount.');
        return;
      }

      milestoneCount++;
      const date = dateVal ? new Date(dateVal).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : 'TBD';

      const milestoneList = document.getElementById('milestone-list');
      const placeholder = document.getElementById('timeline-placeholder');
      
      const newMilestone = document.createElement('div');
      newMilestone.className = 'flex gap-md group animate-in slide-in-from-right duration-500';
      newMilestone.innerHTML = `
        <div class="relative z-10 w-10 flex flex-col items-center">
          <div class="w-5 h-5 rounded-full bg-primary-container border-4 border-surface ring-1 ring-primary group-hover:scale-125 transition-transform duration-300"></div>
        </div>
        <div class="flex-1 glass-morphism p-4 rounded-lg bg-surface-container-highest/40 group-hover:bg-surface-container-highest/60 transition-all">
          <div class="flex justify-between items-start mb-xs">
            <span class="font-label-md text-label-md text-primary">Milestone ${milestoneCount}</span>
            <span class="font-label-sm text-label-sm text-on-surface-variant">${date}</span>
          </div>
          <h4 class="font-headline-md text-body-lg text-on-surface font-semibold mb-xs">${title}</h4>
          <p class="font-body-md text-body-md text-on-surface-variant text-sm mb-base">${desc}</p>
          <div class="flex items-center gap-sm">
            <span class="material-symbols-outlined text-sm text-tertiary">account_balance_wallet</span>
            <span class="font-label-sm text-label-sm text-on-surface">₦ ${parseFloat(amount).toLocaleString(undefined, {minimumFractionDigits: 2})}</span>
          </div>
        </div>
      `;

      milestoneList.insertBefore(newMilestone, placeholder);

      // Reset form with a small scale effect
      document.getElementById('milestone-form').reset();
      
      // Floating Micro-interaction for feedback
      const btn = event.currentTarget;
      const originalHtml = btn.innerHTML;
      btn.innerHTML = '<span class="material-symbols-outlined">check_circle</span> Added to Roadmap!';
      setTimeout(() => {
        btn.innerHTML = originalHtml;
      }, 2000);
    }
  </script>
</body></html>