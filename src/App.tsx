import {
  Fragment,
  useEffect,
  useMemo,
  useRef,
  useState,
  type AnchorHTMLAttributes,
  type CSSProperties,
  type FormEvent,
  type ReactNode,
} from "react";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CircleCheck,
  CreditCard,
  Gift,
  Heart,
  Mail,
  MapPin,
  Menu,
  Minus,
  Package,
  Phone,
  Plus,
  RotateCcw,
  Search,
  Share2,
  ShoppingBag,
  SlidersHorizontal,
  Trash2,
  Truck,
  X,
} from "lucide-react";
import {
  collections,
  getStock,
  formatPrice,
  imageLibrary,
  navigationLinks,
  products,
  subCategories,
  getBundleOptions,
  BUNDLE_MIN,
  type BundleOption,
  socialLinks,
  type Collection,
  type Product,
} from "./data/catalog";

type CartLine = {
  productId: string;
  color: string;
  size?: string;
  quantity: number;
  /** Per-piece price when added through a bundle. */
  unitPrice?: number;
};

const linePrice = (line: { unitPrice?: number; product: Product }) => line.unitPrice ?? line.product.price;
const sameLine = (a: CartLine, b: CartLine) =>
  a.productId === b.productId && a.color === b.color && (a.size || "") === (b.size || "") && (a.unitPrice ?? -1) === (b.unitPrice ?? -1);

type CartProduct = CartLine & { product: Product };
type CheckoutValues = {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  notes: string;
};
type Navigate = (href: string) => void;
type SortOption = "Featured" | "Price: Low to High" | "Price: High to Low" | "Newest";

const SHIPPING_FEE = 300;
const FREE_SHIPPING_THRESHOLD = 5000;

function usePersistentState<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(() => {
    try {
      const saved = window.localStorage.getItem(key);
      return saved ? (JSON.parse(saved) as T) : initialValue;
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // Storage can be unavailable in private browsing; the in-memory state still works.
    }
  }, [key, value]);

  return [value, setValue] as const;
}

function getProductBySlug(slug: string) {
  return products.find((product) => product.slug === slug);
}

function App() {
  const [location, setLocation] = useState(() => ({
    pathname: window.location.pathname,
    search: window.location.search,
  }));
  const [cart, setCart] = usePersistentState<CartLine[]>("rah-cart", []);
  const [wishlist, setWishlist] = usePersistentState<string[]>("rah-wishlist", []);
  const [preferences, setPreferences] = usePersistentState<{ sort: SortOption }>(
    "rah-preferences",
    { sort: "Featured" },
  );
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [toast, setToast] = useState("");
  const toastTimer = useRef<number | undefined>(undefined);

  const params = useMemo(() => new URLSearchParams(location.search), [location.search]);

  const navigate: Navigate = (href) => {
    const target = new URL(href, window.location.origin);
    const next = `${target.pathname}${target.search}${target.hash}`;
    window.history.pushState({}, "", next);
    setLocation({ pathname: target.pathname, search: target.search });
    setMenuOpen(false);
    setSearchOpen(false);
    setCartOpen(false);
    window.scrollTo({ top: 0, behavior: "auto" });
  };

  useEffect(() => {
    // Route changes should always open at the top, after the new page has rendered.
    document.documentElement.style.scrollBehavior = "auto";
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    requestAnimationFrame(() => {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
      document.documentElement.style.scrollBehavior = "";
    });
  }, [location.pathname]);

  useEffect(() => {
    const handlePopState = () => {
      setLocation({ pathname: window.location.pathname, search: window.location.search });
      setMenuOpen(false);
      setSearchOpen(false);
      setCartOpen(false);
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  useEffect(() => {
    const description =
      "Thoughtful hijabs, timeless chaddars and considered gifts. Discover BY RAH. Edit, modest fashion made meaningful.";
    document.title = "RAH. — Modesty by RAH";
    let meta = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.name = "description";
      document.head.appendChild(meta);
    }
    meta.content = description;
  }, [location.pathname]);

  useEffect(
    () => () => {
      if (toastTimer.current) window.clearTimeout(toastTimer.current);
    },
    [],
  );

  const notify = (message: string) => {
    setToast(message);
    if (toastTimer.current) window.clearTimeout(toastTimer.current);
    toastTimer.current = window.setTimeout(() => setToast(""), 3000);
  };

  const addToCart = (
    productId: string,
    color = "One size",
    size = "",
    quantity = 1,
  ) => {
    const product = products.find((item) => item.id === productId);
    if (!product) return;
    const available = getStock(product, color);
    if (available < 1) {
      notify("This piece is out of stock.");
      return;
    }
    setCart((current) => {
      const existing = current.find(
        (item) => item.productId === productId && item.color === color && (item.size || "") === size,
      );
      if (existing) {
        return current.map((item) =>
          item === existing
            ? { ...item, quantity: Math.min(item.quantity + quantity, available) }
            : item,
        );
      }
      return [...current, { productId, color, size: size || undefined, quantity: Math.min(quantity, available) }];
    });
    setCartOpen(true);
    notify(`${product.name} added to your bag.`);
  };

  const addManyToCart = (picks: { productId: string; color: string }[], label: string, bundlePrice?: number) => {
    const unitPrice = bundlePrice ? bundlePrice / picks.length : undefined;
    setCart((current) => {
      let next = [...current];
      picks.forEach(({ productId, color }) => {
        const product = products.find((item) => item.id === productId);
        const available = product ? getStock(product, color) : 0;
        if (!product || available < 1) return;
        const existing = next.find((item) => item.productId === productId && item.color === color && !item.size && item.unitPrice === unitPrice);
        if (existing) {
          next = next.map((item) => (item === existing ? { ...item, quantity: Math.min(item.quantity + 1, available) } : item));
        } else {
          next = [...next, { productId, color, quantity: 1, ...(unitPrice ? { unitPrice } : {}) }];
        }
      });
      return next;
    });
    setCartOpen(true);
    notify(`${picks.length} pieces from ${label} added to your bag.`);
  };

  const updateCartQuantity = (line: CartLine, amount: number) => {
    const product = products.find((item) => item.id === line.productId);
    setCart((current) =>
      current.flatMap((item) => {
        if (!sameLine(item, line)) {
          return [item];
        }
        const nextQuantity = item.quantity + amount;
        if (nextQuantity < 1) return [];
        return [{ ...item, quantity: Math.min(nextQuantity, product ? getStock(product, line.color) : nextQuantity) }];
      }),
    );
  };

  const removeCartLine = (line: CartLine) => {
    setCart((current) =>
      current.filter((item) => !sameLine(item, line)),
    );
  };

  const toggleWishlist = (productId: string) => {
    const alreadySaved = wishlist.includes(productId);
    setWishlist((current) =>
      alreadySaved ? current.filter((item) => item !== productId) : [...current, productId],
    );
    notify(alreadySaved ? "Removed from your wishlist." : "Saved to your wishlist.");
  };

  const cartProducts = useMemo<CartProduct[]>(
    () =>
      cart.flatMap((line) => {
        const product = products.find((item) => item.id === line.productId);
        return product ? [{ ...line, product }] : [];
      }),
    [cart],
  );
  const cartCount = cartProducts.reduce((sum, line) => sum + line.quantity, 0);
  const subtotal = cartProducts.reduce((sum, line) => sum + linePrice(line) * line.quantity, 0);
  const shipping = subtotal === 0 || subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE;
  const total = subtotal + shipping;

  const openSearch = () => {
    setSearchTerm(params.get("q") || "");
    setSearchOpen(true);
  };

  const shareProduct = async (product: Product) => {
    const shareUrl = `${window.location.origin}/products/${product.slug}`;
    try {
      if (navigator.share) {
        await navigator.share({ title: product.name, url: shareUrl });
        return;
      }
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(shareUrl);
        notify("Product link copied to your clipboard.");
        return;
      }
      window.prompt("Copy this product link:", shareUrl);
    } catch {
      // A dismissed native share sheet is not an error for the shopper.
    }
  };

  const baseCollectionSlug = location.pathname.startsWith("/collections/")
    ? location.pathname.split("/")[2]
    : "";
  const pathParts = location.pathname.split("/");
  const subCategorySlug = baseCollectionSlug && pathParts[3] ? pathParts[3] : "";
  const parentSubCategory = subCategorySlug
    ? subCategories[baseCollectionSlug]?.find((item) => item.slug === subCategorySlug)
    : undefined;
  const childSlug = baseCollectionSlug && pathParts[4] ? pathParts[4] : "";
  const activeSubCategory = childSlug
    ? parentSubCategory?.children?.find((item) => item.slug === childSlug)
    : parentSubCategory;
  const searchQuery = params.get("q") || "";

  let page: ReactNode;
  if (location.pathname === "/") {
    page = (
      <HomePage
        navigate={navigate}
        wishlist={wishlist}
        onWishlist={toggleWishlist}
        onAdd={addToCart}
      />
    );
  } else if (location.pathname === "/shop" || location.pathname === "/search" || baseCollectionSlug) {
    const isSearch = location.pathname === "/search";
    const isShop = location.pathname === "/shop";
    const meta = getCollectionMeta(baseCollectionSlug);
    let baseProducts = [...products];
    if (baseCollectionSlug === "hijabs") baseProducts = baseProducts.filter((item) => item.category === "Hijabs");
    else if (baseCollectionSlug === "chiffon-georgette") baseProducts = baseProducts.filter((item) => item.subcategory === "Chiffon Georgette");
    else if (baseCollectionSlug === "soft-crinkle-crimps") baseProducts = baseProducts.filter((item) => item.subcategory === "Soft Crinkle Crimps");
    else if (baseCollectionSlug) {
      baseProducts = baseProducts.filter((item) => item.collections.includes(baseCollectionSlug));
    }
    if (activeSubCategory) {
      const labels = activeSubCategory.children ? activeSubCategory.children.map((child) => child.label) : [activeSubCategory.label];
      baseProducts = baseProducts.filter((item) => !!item.subcategory && labels.includes(item.subcategory));
    }
    if (isSearch) baseProducts = [...products];
    const newOnly = params.get("new") === "true";
    const requestedSort = params.get("sort") as SortOption | null;
    const validSorts: SortOption[] = ["Featured", "Price: Low to High", "Price: High to Low", "Newest"];
    const groupedSections: { heading: string; items: Product[] }[] | null =
      !isSearch && !isShop && parentSubCategory?.children && !childSlug
        ? parentSubCategory.children.map((child) => ({ heading: child.label, items: products.filter((item) => item.subcategory === child.label) }))
        : !isSearch && !isShop && baseCollectionSlug === "bundles" && !subCategorySlug
          ? [{ heading: "Hijab Bundles", items: products.filter((item) => item.category === "Bundles") }]
          : null;
    page = isShop ? (
      <AllCollectionsPage navigate={navigate} />
    ) : groupedSections ? (
      <GroupedCollectionPage
        title={parentSubCategory?.children ? parentSubCategory.label : meta.title}
        crumbs={parentSubCategory?.children ? [{ label: meta.title, href: `/collections/${baseCollectionSlug}` }] : []}
        sections={groupedSections}
        navigate={navigate}
        wishlist={wishlist}
        onWishlist={toggleWishlist}
        onAdd={addToCart}
      />
    ) : (
      <ProductListingPage
        key={`${location.pathname}${location.search}`}
        title={isSearch ? "Search results" : isShop ? "Shop all" : activeSubCategory ? activeSubCategory.label : meta.title}
        parent={
          !isSearch && !isShop && activeSubCategory
            ? [
                { label: meta.title, href: `/collections/${baseCollectionSlug}` },
                ...(childSlug && parentSubCategory ? [{ label: parentSubCategory.label, href: `/collections/${baseCollectionSlug}/${parentSubCategory.slug}` }] : []),
              ]
            : undefined
        }
        description={
          isSearch
            ? searchQuery
              ? `Showing pieces for “${searchQuery}”.`
              : "Search thoughtfully selected pieces from RAH."
            : isShop
              ? "A considered collection of pieces for everyday elegance and meaningful gifting."
              : activeSubCategory
                ? `${activeSubCategory.label} from our ${meta.title} collection.`
                : meta.description
        }
        products={baseProducts}
        query={isSearch ? searchQuery : ""}
        newOnly={newOnly}
        sortPreference={requestedSort && validSorts.includes(requestedSort) ? requestedSort : preferences.sort}
        setSortPreference={(sort) => setPreferences((current) => ({ ...current, sort }))}
        navigate={navigate}
        wishlist={wishlist}
        onWishlist={toggleWishlist}
        onAdd={addToCart}
      />
    );
  } else if (location.pathname.startsWith("/products/")) {
    const productSlug = location.pathname.split("/")[2];
    const product = getProductBySlug(productSlug);
    page = product ? (
      <ProductDetailPage
        key={product.id}
        product={product}
        navigate={navigate}
        saved={wishlist.includes(product.id)}
        onWishlist={() => toggleWishlist(product.id)}
        onToggleProductWishlist={toggleWishlist}
        onAdd={addToCart}
        onAddMany={addManyToCart}
        onShare={() => shareProduct(product)}
        wishlist={wishlist}
      />
    ) : (
      <NotFoundPage navigate={navigate} />
    );
  } else if (location.pathname === "/wishlist") {
    page = (
      <WishlistPage
        items={products.filter((item) => wishlist.includes(item.id))}
        wishlist={wishlist}
        navigate={navigate}
        onWishlist={toggleWishlist}
        onAdd={addToCart}
      />
    );
  } else if (location.pathname === "/cart") {
    page = (
      <CartPage
        lines={cartProducts}
        subtotal={subtotal}
        shipping={shipping}
        total={total}
        navigate={navigate}
        onQuantityChange={updateCartQuantity}
        onRemove={removeCartLine}
        onClear={() => setCart([])}
      />
    );
  } else if (location.pathname === "/checkout") {
    page = (
      <CheckoutPage
        lines={cartProducts}
        subtotal={subtotal}
        shipping={shipping}
        total={total}
        navigate={navigate}
        onComplete={() => setCart([])}
      />
    );
  } else if (location.pathname.startsWith("/pages/")) {
    page = <InfoPage slug={location.pathname.split("/")[2]} navigate={navigate} />;
  } else {
    page = <NotFoundPage navigate={navigate} />;
  }

  return (
    <div className="app-shell">
      <AnnouncementBar />
      <Header
        pathname={location.pathname}
        cartCount={cartCount}
        wishlistCount={wishlist.length}
        onMenu={() => setMenuOpen(true)}
        onSearch={openSearch}
        onCart={() => setCartOpen(true)}
        navigate={navigate}
      />
      {page}
      <Footer navigate={navigate} />

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} navigate={navigate} wishlistCount={wishlist.length} />
      <SearchOverlay
        open={searchOpen}
        query={searchTerm}
        setQuery={setSearchTerm}
        onClose={() => setSearchOpen(false)}
        navigate={navigate}
      />
      <CartDrawer
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        lines={cartProducts}
        subtotal={subtotal}
        shipping={shipping}
        total={total}
        navigate={navigate}
        onQuantityChange={updateCartQuantity}
        onRemove={removeCartLine}
      />
      {toast && (
        <div className="toast-message" role="status" aria-live="polite">
          <CircleCheck size={18} aria-hidden="true" />
          <span>{toast}</span>
          <button type="button" aria-label="Dismiss message" onClick={() => setToast("")}>
            <X size={16} />
          </button>
        </div>
      )}
    </div>
  );
}

function getCollectionMeta(slug: string): Collection {
  const found = collections.find((item) => item.slug === slug);
  if (found) return found;
  const labels: Record<string, { title: string; description: string; image: string }> = {
    hijabs: {
      title: "Hijabs",
      description: "Soft, considered layers in colours you will come back to.",
      image: imageLibrary.georgette,
    },
    bundles: {
      title: "Hijab Bundles",
      description: "Build your own considered pairings in the colours you love.",
      image: imageLibrary.bundles,
    },
    hampers: {
      title: "Hampers",
      description: "Thoughtful gifts for meaningful moments.",
      image: imageLibrary.hampers,
    },
    "large-dubatta": {
      title: "Large Dubatta",
      description: "Extra coverage and a comfortable drape, made for everyday ease.",
      image: "/images/products/large-dubatta/large-dubatta-black.jpg",
    },
  };
  const content = labels[slug] || {
    title: "Shop all",
    description: "Explore the considered RAH. edit.",
    image: imageLibrary.hero,
  };
  return { slug, ...content };
}

function AnnouncementBar() {
  return (
    <div className="announcement-bar" role="region" aria-label="Store announcements">
      <div className="announcement-track">
        {[0, 1].map((copy) => (
          <p className="announcement-text" key={copy} aria-hidden={copy === 1}>
            {SHIPPING_FEE}/- DELIVERY CHARGES ALL OVER PAKISTAN <span className="announcement-dot">•</span> EASY EXCHANGE POLICY <span className="announcement-dot">•</span> DISCOUNTED BUNDLES AVAILABLE <span className="announcement-dot">•</span>
          </p>
        ))}
      </div>
    </div>
  );
}

function Header({
  pathname,
  cartCount,
  wishlistCount,
  onMenu,
  onSearch,
  onCart,
  navigate,
}: {
  pathname: string;
  cartCount: number;
  wishlistCount: number;
  onMenu: () => void;
  onSearch: () => void;
  onCart: () => void;
  navigate: Navigate;
}) {
  return (
    <header className="site-header">
      <div className="header-main">
        <button className="icon-button mobile-menu-trigger" type="button" aria-label="Open menu" onClick={onMenu}>
          <Menu size={22} strokeWidth={1.5} />
        </button>
        <StoreLink href="/" navigate={navigate} className="wordmark" aria-label="RAH. home">
          <img className="wordmark-logo" src={imageLibrary.logoHeader} alt="RAH. — Modesty by RAH" />
        </StoreLink>
        <div className="header-actions">
          <button className="icon-button" type="button" aria-label="Search products" onClick={onSearch}>
            <Search size={21} strokeWidth={1.5} />
          </button>
          <StoreLink
            href="/wishlist"
            navigate={navigate}
            className={`icon-button header-link ${pathname === "/wishlist" ? "is-current" : ""}`}
            aria-label={`Wishlist, ${wishlistCount} saved items`}
          >
            <Heart size={21} strokeWidth={1.5} />
            {wishlistCount > 0 && <span className="header-count">{wishlistCount}</span>}
          </StoreLink>
          <button className="icon-button header-bag" type="button" aria-label={`Open shopping bag, ${cartCount} items`} onClick={onCart}>
            <ShoppingBag size={21} strokeWidth={1.5} />
            <span className="header-count">{cartCount}</span>
          </button>
        </div>
      </div>
      <nav className="desktop-nav" aria-label="Main navigation">
        {navigationLinks.map((link) => {
          const subs = subCategories[linkKey(link.href)];
          const active = pathname === link.href || pathname.startsWith(`${link.href}/`);
          if (!subs) {
            return (
              <StoreLink key={link.href} href={link.href} navigate={navigate} className={active ? "active" : ""}>
                {link.label}
              </StoreLink>
            );
          }
          return (
            <div className="nav-item has-sub" key={link.href}>
              <StoreLink href={link.href} navigate={navigate} className={active ? "active" : ""} aria-haspopup="true">
                {link.label}<ChevronDown size={12} aria-hidden="true" />
              </StoreLink>
              <div className="nav-dropdown">
                {subs.map((sub) => (
                  <Fragment key={sub.slug}>
                    <StoreLink href={`${link.href}/${sub.slug}`} navigate={navigate} className={sub.children ? "nav-sub-parent" : ""}>{sub.label}</StoreLink>
                  </Fragment>
                ))}
              </div>
            </div>
          );
        })}
      </nav>
    </header>
  );
}

type StoreLinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "children" | "className" | "onClick"> & {
  href: string;
  navigate: Navigate;
  children: ReactNode;
  className?: string;
  onClick?: AnchorHTMLAttributes<HTMLAnchorElement>["onClick"];
};

function StoreLink({
  href,
  navigate,
  children,
  className = "",
  onClick: onLinkClick,
  ...props
}: StoreLinkProps) {
  return (
    <a
      href={href}
      className={className}
      onClick={(event) => {
        onLinkClick?.(event);
        if (event.defaultPrevented) return;
        if (
          event.button === 0 &&
          !event.metaKey &&
          !event.ctrlKey &&
          !event.shiftKey &&
          !event.altKey
        ) {
          event.preventDefault();
          navigate(href);
        }
      }}
      {...props}
    >
      {children}
    </a>
  );
}

function linkKey(href: string) {
  return href.split("/")[2] || "";
}

function MobileMenu({ open, onClose, navigate, wishlistCount }: { open: boolean; onClose: () => void; navigate: Navigate; wishlistCount: number }) {
  const [panel, setPanel] = useState<string | null>(null);
  useEffect(() => {
    if (!open) {
      const timer = window.setTimeout(() => setPanel(null), 350);
      return () => window.clearTimeout(timer);
    }
  }, [open]);
  const panelParts = panel ? panel.split("/") : [];
  const panelLink = panel ? navigationLinks.find((link) => linkKey(link.href) === panelParts[0]) : undefined;
  const panelParent = panelParts[1] ? subCategories[panelParts[0]]?.find((sub) => sub.slug === panelParts[1]) : undefined;
  const panelSubs = panel ? (panelParent ? panelParent.children : subCategories[panelParts[0]]) : undefined;
  const panelBase = panelLink ? (panelParent ? `${panelLink.href}/${panelParent.slug}` : panelLink.href) : "";
  useEffect(() => {
    if (!open) return;
    const handleKey = (event: KeyboardEvent) => event.key === "Escape" && onClose();
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [open, onClose]);

  return (
    <div className={`drawer-layer menu-layer ${open ? "is-open" : ""}`} aria-hidden={!open}>
      <button className="drawer-backdrop" type="button" onClick={onClose} tabIndex={open ? 0 : -1} aria-label="Close menu" />
      <nav className="mobile-menu" aria-label="Mobile navigation" aria-modal="true" role="dialog">
        <div className="drawer-heading">
          <StoreLink href="/" navigate={navigate} className="wordmark wordmark-small" onClick={onClose}>
            <img className="wordmark-logo" src={imageLibrary.logoHeader} alt="RAH. — Modesty by RAH" />
          </StoreLink>
          <button className="icon-button" type="button" aria-label="Close menu" onClick={onClose}>
            <X size={22} />
          </button>
        </div>
        {panelLink && panelSubs ? (
          <div className="mobile-menu-links mobile-submenu" key={`sub-${panel}`}>
            <button type="button" className="submenu-back" onClick={() => setPanel(panelParent ? panelParts[0] : null)}>
              <ChevronLeft size={17} strokeWidth={1.6} aria-hidden="true" /> {panelParent ? panelLink.label : "Menu"}
            </button>
            <StoreLink href={panelBase} navigate={navigate} onClick={onClose} className="submenu-all">
              <span>All {panelParent ? panelParent.label : panelLink.label}</span>
            </StoreLink>
            {panelSubs.map((sub) =>
              <StoreLink key={sub.slug} href={`${panelBase}/${sub.slug}`} navigate={navigate} onClick={onClose}>
                <span>{sub.label}</span>
              </StoreLink>,
            )}
          </div>
        ) : (
          <div className="mobile-menu-links" key="main">
            {navigationLinks.map((link) =>
              subCategories[linkKey(link.href)] ? (
                <button key={link.href} type="button" className="menu-parent" onClick={() => setPanel(linkKey(link.href))} aria-haspopup="true">
                  <span>{link.label}</span>
                  <ChevronRight size={17} strokeWidth={1.5} aria-hidden="true" />
                </button>
              ) : (
                <StoreLink key={link.href} href={link.href} navigate={navigate} onClick={onClose}>
                  <span>{link.label}</span>
                </StoreLink>
              ),
            )}
            <StoreLink href="/wishlist" navigate={navigate} onClick={onClose} className="menu-wishlist-link">
              <span>Wishlist{wishlistCount > 0 ? ` (${wishlistCount})` : ""}</span>
              <Heart size={17} strokeWidth={1.5} />
            </StoreLink>
          </div>
        )}
        <div className="mobile-menu-footer">
          <p className="menu-note">Thoughtful pieces, made for the everyday.</p>
          <SocialIconRow className="menu-social-row" />
        </div>
      </nav>
    </div>
  );
}

function SearchOverlay({
  open,
  query,
  setQuery,
  onClose,
  navigate,
}: {
  open: boolean;
  query: string;
  setQuery: (value: string) => void;
  onClose: () => void;
  navigate: Navigate;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const matches = useMemo(() => searchProducts(query).slice(0, 4), [query]);
  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);
  useEffect(() => {
    if (!open) return;
    const handleKey = (event: KeyboardEvent) => event.key === "Escape" && onClose();
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [open, onClose]);

  const submit = (event: FormEvent) => {
    event.preventDefault();
    navigate(`/search?q=${encodeURIComponent(query.trim())}`);
  };

  return (
    <div className={`search-layer ${open ? "is-open" : ""}`} aria-hidden={!open}>
      <button className="search-backdrop" type="button" aria-label="Close search" onClick={onClose} tabIndex={open ? 0 : -1} />
      <div className="search-panel" role="dialog" aria-modal="true" aria-label="Search RAH products">
        <div className="search-panel-top">
          <span className="eyebrow">FIND YOUR FAVOURITE</span>
          <button className="icon-button" type="button" aria-label="Close search" onClick={onClose}>
            <X size={22} />
          </button>
        </div>
        <form className="search-form" onSubmit={submit}>
          <Search size={21} strokeWidth={1.5} aria-hidden="true" />
          <input
            ref={inputRef}
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search hijabs, irani chaddar, gifts..."
            aria-label="Search by product, category or description"
          />
          {query && <button type="button" className="text-button" onClick={() => setQuery("")}>Clear</button>}
          <button className="search-submit" type="submit" aria-label="View search results">
            <ArrowRight size={20} />
          </button>
        </form>
        <div className="search-suggestions">
          <p className="eyebrow">{query ? `${matches.length} SUGGESTED PIECES` : "A FEW THOUGHTFUL PLACES TO START"}</p>
          {query ? (
            matches.length ? (
              <div className="suggestion-list">
                {matches.map((product) => (
                  <button
                    type="button"
                    className="suggestion-item"
                    key={product.id}
                    onClick={() => navigate(`/products/${product.slug}`)}
                  >
                    <StoreImage src={product.images[0]} alt="" />
                    <span><strong>{product.name}</strong><small>{formatPrice(product.price)}</small></span>
                    <ArrowUpRight size={16} />
                  </button>
                ))}
                <button className="all-results-link" type="button" onClick={() => navigate(`/search?q=${encodeURIComponent(query)}`)}>
                  View all search results <ArrowRight size={16} />
                </button>
              </div>
            ) : <p className="search-empty">No pieces found. Try “hijab”, “chaddar” or “gift”.</p>
          ) : (
            <div className="quick-search-links">
              {["New arrivals", "Everyday hijabs", "Thoughtful gifts"].map((label, index) => (
                <button key={label} type="button" onClick={() => navigate(index === 2 ? "/collections/hampers" : index === 1 ? "/collections/hijabs" : "/shop?new=true&sort=Newest")}>
                  {label}<ArrowUpRight size={15} />
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function searchProducts(query: string) {
  const normalized = query.toLowerCase().trim();
  if (!normalized) return [];
  return products.filter((product) =>
    [product.name, product.category, product.collection, product.description.replace(/\*/g, ""), ...product.keywords]
      .join(" ")
      .toLowerCase()
      .includes(normalized),
  );
}

function HomePage({
  navigate,
  wishlist,
  onWishlist,
  onAdd,
}: {
  navigate: Navigate;
  wishlist: string[];
  onWishlist: (productId: string) => void;
  onAdd: (productId: string, color?: string, size?: string, quantity?: number) => void;
}) {
  return (
    <main>
      <HeroSection />
      <ServiceHighlights />
      <section className="section collections-section" id="collections">
        <div className="section-heading section-heading-split">
          <div>
            <p className="eyebrow">THE COLLECTIONS</p>
            <h2>Shop by Collection</h2>
          </div>
          <StoreLink className="underlined-link" href="/shop" navigate={navigate}>
            View Everything <ArrowRight size={16} />
          </StoreLink>
        </div>
        <div className="collection-grid">
          {collections.map((collection, index) => (
            <CollectionCard key={collection.slug} collection={collection} index={index} navigate={navigate} />
          ))}
        </div>
      </section>
      <section className="section featured-section">
        <div className="section-heading section-heading-split">
          <div>
            <h2>BY RAH. Edit</h2>
            <p className="section-description">Thoughtfully selected pieces for everyday elegance.</p>
          </div>
        </div>
        <ProductGrid
          items={products.filter((item) => item.bundleOf || item.subcategory === "Vintage Leopard")}
          navigate={navigate}
          wishlist={wishlist}
          onWishlist={onWishlist}
          onAdd={onAdd}
        />
      </section>
      <PromotionalBanner navigate={navigate} />
      <Testimonials />
    </main>
  );
}

function HeroSection() {
  return (
    <section className="hero-section" aria-label="RAH. collection banner">
      <img
        className="hero-image"
        src={imageLibrary.banner}
        alt="Curated with love and care for you. Premium Abayas, Hijabs and Gift Hampers. By RAH."
        width={1024}
        height={338}
        fetchPriority="high"
        decoding="async"
      />
    </section>
  );
}

function ServiceHighlights() {
  const items = [
    { icon: Package, title: "Fast Delivery", detail: "3–7 Days" },
    { icon: Gift, title: "Gift Packaging", detail: "Premium Wrap" },
    { icon: CreditCard, title: "Cash on Delivery", detail: "Available" },
    { icon: RotateCcw, title: "Easy Exchange", detail: "7 Days Policy" },
  ];
  return (
    <section className="service-section" aria-label="Shopping services">
      <div className="service-grid">
        {items.map(({ icon: Icon, title, detail }) => (
          <div className="service-item" key={title}>
            <Icon size={21} strokeWidth={1.45} aria-hidden="true" />
            <div><strong>{title}</strong><span>{detail}</span></div>
          </div>
        ))}
      </div>
    </section>
  );
}

function CollectionCard({
  collection,
  index,
  navigate,
  href,
}: {
  collection: Collection;
  index: number;
  navigate: Navigate;
  href?: string;
}) {
  return (
    <StoreLink href={href || `/collections/${collection.slug}`} navigate={navigate} className={`collection-card collection-card-${index + 1}`}>
      <div className="collection-image-wrap">
        <StoreImage src={collection.image} alt={`${collection.title} collection`} />
      </div>
      <div className="collection-card-caption">
        <h3>{collection.title}</h3>
      </div>
    </StoreLink>
  );
}

function ProductGrid({
  items,
  navigate,
  onWishlist,
  isWishlistPage,
}: {
  items: Product[];
  navigate: Navigate;
  wishlist?: string[];
  onWishlist?: (productId: string) => void;
  onAdd?: (productId: string, color?: string, size?: string, quantity?: number) => void;
  isWishlistPage?: boolean;
}) {
  if (!items.length) {
    return (
      <div className="empty-state product-empty">
        <p className="eyebrow">NOT FOUND THIS TIME</p>
        <h3>Nothing quite like that.</h3>
        <p>Try another search or clear a filter to see more from RAH.</p>
        <StoreLink href="/shop" navigate={navigate} className="button button-outline">Explore all pieces</StoreLink>
      </div>
    );
  }
  return (
    <div className="product-grid">
      {items.map((product, index) => (
        <ProductCard
          key={product.id}
          product={product}
          index={index}
          navigate={navigate}
          showRemove={isWishlistPage}
          onRemove={onWishlist ? () => onWishlist(product.id) : undefined}
        />
      ))}
    </div>
  );
}

function ProductCard({
  product,
  index,
  navigate,
  showRemove,
  onRemove,
}: {
  product: Product;
  index: number;
  navigate: Navigate;
  showRemove?: boolean;
  onRemove?: () => void;
}) {
  return (
    <article className={`product-card ${product.bundleOf ? "is-bundle" : ""}`} style={{ "--card-index": index } as CSSProperties}>
      <div className="product-card-image-wrap">
        <StoreLink href={`/products/${product.slug}`} navigate={navigate} className="product-image-link" aria-label={`View ${product.name}`}>
          <StoreImage src={product.images[0]} alt={product.name} />
          {product.stock < 1 && <span className="sold-out-badge">Out of stock</span>}
        </StoreLink>
      </div>
      <StoreLink href={`/products/${product.slug}`} navigate={navigate} className="product-card-info">
        <h3>{product.name}</h3>
        <div className="product-price-row">
          <span>
            {product.bundleOf && product.bundlePrices
              ? `${Math.max(...Object.keys(product.bundlePrices).map(Number))} pieces for ${formatPrice(product.bundlePrices[Math.max(...Object.keys(product.bundlePrices).map(Number))])}`
              : formatPrice(product.price)}
          </span>
        </div>
      </StoreLink>
      {showRemove && onRemove && (
        <button
          type="button"
          className="wishlist-card-remove"
          onClick={onRemove}
        >
          Remove from wishlist
        </button>
      )}
    </article>
  );
}

function PromotionalBanner({ navigate }: { navigate: Navigate }) {
  return (
    <section className="promo-section">
      <div className="promo-content">
        <p className="eyebrow">A THOUGHTFUL GESTURE</p>
        <h2>A Little Something Special</h2>
        <p>Discover thoughtful gifts and curated bundles made for meaningful moments.</p>
        <StoreLink className="button button-light" href="/collections/hampers" navigate={navigate}>
          Explore Hampers <ArrowRight size={16} />
        </StoreLink>
      </div>
      <div className="promo-image-wrap">
        <StoreImage src={imageLibrary.hampers} alt="Thoughtfully arranged gift hamper" />
      </div>
    </section>
  );
}

const customerReviews = [
  { id: "fabric", image: "/images/reviews/fabric.jpg", width: 700, height: 1107, alt: "Customer chat: the fabric quality is really good, completely satisfied, definitely a 10/10." },
  { id: "parcel", image: "/images/reviews/parcel.jpg", width: 700, height: 524, alt: "Customer message thanking RAH after receiving the parcel and sending blessings." },
  { id: "quality", image: "/images/reviews/quality.jpg", width: 700, height: 258, alt: "Customer message: absolutely loved the quality of the product and the quick service." },
  { id: "beautiful", image: "/images/reviews/beautiful.jpg", width: 700, height: 647, alt: "Customer chat saying the piece was very beautiful and wishing RAH success." },
  { id: "expectations", image: "/images/reviews/expectations.jpg", width: 700, height: 664, alt: "Customer message saying the parcel was even better than expected." },
  { id: "better", image: "/images/reviews/better.jpg", width: 700, height: 459, alt: "Customer message saying this piece was better than one bought elsewhere." },
];

function ReviewCard({ review, hidden = false }: { review: (typeof customerReviews)[number]; hidden?: boolean }) {
  return (
    <article className="review-card" aria-hidden={hidden || undefined}>
      <div className={`review-shot ${review.height / review.width > 1.2 ? "is-tall" : ""}`}>
        <img src={review.image} alt={hidden ? "" : review.alt} width={review.width} height={review.height} loading="lazy" decoding="async" />
      </div>
      <div className="review-rating">
        <span className="review-stars" aria-label="5 out of 5 stars">★★★★★</span>
        <span>Satisfied</span>
      </div>
    </article>
  );
}

function Testimonials() {
  return (
    <section className="testimonials-section" aria-labelledby="reviews-heading">
      <div className="section-heading centered-heading reviews-heading">
        <p className="eyebrow">KIND WORDS</p>
        <h2 id="reviews-heading">Kind Words from Our Customers</h2>
      </div>
      <div className="review-marquee">
        <div className="review-track">
          {[0, 1].map((copy) => (
            <div className="review-group" key={copy}>
              {customerReviews.map((review) => (
                <ReviewCard key={`${review.id}-${copy}`} review={review} hidden={copy === 1} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function GroupedCollectionPage({
  title,
  crumbs,
  sections,
  navigate,
  wishlist,
  onWishlist,
  onAdd,
}: {
  title: string;
  crumbs: { label: string; href: string }[];
  sections: { heading: string; items: Product[] }[];
  navigate: Navigate;
  wishlist: string[];
  onWishlist: (id: string) => void;
  onAdd: (id: string, color?: string, size?: string, quantity?: number) => void;
}) {
  return (
    <main className="listing-page all-collections-page">
      <div className="page-shell">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, ...crumbs, { label: title }]} navigate={navigate} />
        <div className="listing-intro"><p className="eyebrow">BY RAH. COLLECTION</p><h1>{title}</h1></div>
      </div>
      <div className="page-shell all-collections-content">
        {sections.map((section) => (
          <section className="all-collection-subcategory" key={section.heading}>
            {section.heading !== title && <h2 className="grouped-heading">{section.heading}</h2>}
            {section.items.length ? (
              <ProductGrid items={section.items} navigate={navigate} wishlist={wishlist} onWishlist={onWishlist} onAdd={onAdd} />
            ) : (
              <p className="grouped-empty">Coming soon.</p>
            )}
          </section>
        ))}
      </div>
    </main>
  );
}

function AllCollectionsPage({ navigate }: { navigate: Navigate }) {
  const firstImage = (predicate: (item: Product) => boolean, fallback: string) => products.find(predicate)?.images[0] || fallback;
  const sections: { title: string; href: string; cards: { title: string; href: string; image?: string }[] }[] = [
    {
      title: "Hijabs",
      href: "/collections/hijabs",
      cards: subCategories.hijabs.map((sub) => {
        const labels = sub.children ? sub.children.map((child) => child.label) : [sub.label];
        return {
          title: sub.label,
          href: `/collections/hijabs/${sub.slug}`,
          image: products.find((item) => !!item.subcategory && labels.includes(item.subcategory))?.images[0],
        };
      }),
    },
    { title: "Irani Chaddar", href: "/collections/irani-chaddar", cards: [{ title: "Irani Chaddar", href: "/collections/irani-chaddar", image: firstImage((item) => item.category === "Irani Chaddar", imageLibrary.abaya) }] },
    { title: "Large Dubatta", href: "/collections/large-dubatta", cards: [{ title: "Large Dubatta", href: "/collections/large-dubatta", image: firstImage((item) => item.category === "Large Dubatta", imageLibrary.hampers) }] },
    {
      title: "Accessories",
      href: "/collections/accessories",
      cards: subCategories.accessories.map((sub) => ({
        title: sub.label,
        href: `/collections/accessories/${sub.slug}`,
        image: products.find((item) => item.subcategory === sub.label)?.images[0],
      })),
    },
    { title: "Bundles", href: "/collections/bundles", cards: [{ title: "Hijab Bundles", href: "/collections/bundles", image: firstImage((item) => item.category === "Bundles", imageLibrary.hampers) }] },
    { title: "Hampers", href: "/collections/hampers", cards: [{ title: "Hampers", href: "/collections/hampers", image: imageLibrary.hampers }] },
  ];
  return (
    <main className="listing-page all-collections-page">
      <div className="page-shell">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "View Everything" }]} navigate={navigate} />
        <div className="listing-intro"><p className="eyebrow">BY RAH. COLLECTION</p><h1>View Everything</h1></div>
      </div>
      <div className="page-shell all-collections-content">
        {sections.map((section) => (
          <section className="all-collection-category" key={section.title}>
            <div className="section-heading">
              <StoreLink href={section.href} navigate={navigate} className="all-category-link"><h2>{section.title}</h2></StoreLink>
            </div>
            <div className="collection-grid all-collections-grid">
              {section.cards.map((card, index) =>
                card.image ? (
                  <CollectionCard key={card.href} collection={{ slug: card.title, title: card.title, description: "", image: card.image }} href={card.href} index={index} navigate={navigate} />
                ) : (
                  <div key={card.href} className="collection-card is-coming-soon">
                    <div className="collection-image-wrap"><span>Coming Soon</span></div>
                    <div className="collection-card-caption"><h3>{card.title}</h3></div>
                  </div>
                ),
              )}
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}

function ProductListingPage({
  title,
  parent,
  description,
  products: baseProducts,
  query,
  newOnly,
  sortPreference,
  setSortPreference,
  navigate,
  wishlist,
  onWishlist,
  onAdd,
}: {
  title: string;
  parent?: { label: string; href: string }[];
  description: string;
  products: Product[];
  query: string;
  newOnly: boolean;
  sortPreference: SortOption;
  setSortPreference: (sort: SortOption) => void;
  navigate: Navigate;
  wishlist: string[];
  onWishlist: (productId: string) => void;
  onAdd: (productId: string, color?: string, size?: string, quantity?: number) => void;
}) {
  const [categories, setCategories] = useState<string[]>([]);
  const [colors, setColors] = useState<string[]>([]);
  const [maxPrice, setMaxPrice] = useState(15000);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [selectedSort, setSelectedSort] = useState<SortOption>(sortPreference);
  const matchingSearch = useMemo(() => searchProducts(query), [query]);
  const filtered = useMemo(() => {
    let result = baseProducts.filter((product) => {
      const matchesQuery = !query || matchingSearch.some((match) => match.id === product.id);
      const matchesNew = !newOnly || product.isNew;
      const matchesCategory = !categories.length || categories.includes(product.category);
      const matchesColor = !colors.length || product.colors?.some((color) => colors.includes(color.name));
      return matchesQuery && matchesNew && matchesCategory && matchesColor && product.price <= maxPrice;
    });
    if (selectedSort === "Price: Low to High") result = result.sort((a, b) => a.price - b.price);
    if (selectedSort === "Price: High to Low") result = result.sort((a, b) => b.price - a.price);
    if (selectedSort === "Newest") result = result.sort((a, b) => Number(Boolean(b.isNew)) - Number(Boolean(a.isNew)));
    return result;
  }, [baseProducts, categories, colors, matchingSearch, maxPrice, newOnly, query, selectedSort]);
  const hasFilters = categories.length > 0 || colors.length > 0 || maxPrice < 15000;

  const clearFilters = () => {
    setCategories([]);
    setColors([]);
    setMaxPrice(15000);
  };
  const toggle = (value: string, current: string[], update: (values: string[]) => void) => {
    update(current.includes(value) ? current.filter((item) => item !== value) : [...current, value]);
  };

  return (
    <main className="listing-page">
      <div className="page-shell">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, ...(parent || []), { label: title }]} navigate={navigate} />
      <div className="listing-intro">
        <p className="eyebrow">BY RAH. COLLECTION</p>
        <h1>{title}</h1>
        <p>{description}</p>
        {query && <span className="search-query-note">Search: “{query}”</span>}
      </div>
      </div>
      <div className="listing-body">
      <div className="page-shell">
      <div className="listing-toolbar">
        <span className="product-count">{filtered.length} {filtered.length === 1 ? "piece" : "pieces"}</span>
        <div className="listing-toolbar-actions">
          <button type="button" className="filter-toggle" onClick={() => setFiltersOpen((open) => !open)} aria-expanded={filtersOpen}>
            <SlidersHorizontal size={16} /> {filtersOpen ? "Hide filters" : "Filter & sort"}
          </button>
          <label className="sort-select-wrap">
            <span>Sort by</span>
            <select value={selectedSort} onChange={(event) => { const value = event.target.value as SortOption; setSelectedSort(value); setSortPreference(value); }} aria-label="Sort products">
              <option>Featured</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Newest</option>
            </select>
            <ChevronDown size={14} aria-hidden="true" />
          </label>
        </div>
      </div>
      <div className="listing-layout">
        <FilterSidebar
          products={baseProducts}
          categories={categories}
          colors={colors}
          maxPrice={maxPrice}
          filtersOpen={filtersOpen}
          hasFilters={hasFilters}
          onClear={clearFilters}
          onCategoryToggle={(category) => toggle(category, categories, setCategories)}
          onColorToggle={(color) => toggle(color, colors, setColors)}
          onPriceChange={setMaxPrice}
        />
        <div className="listing-results">
          {hasFilters && <button type="button" className="clear-filters-mobile" onClick={clearFilters}>Clear all filters <X size={14} /></button>}
          {filtered.length ? (
            <ProductGrid items={filtered} navigate={navigate} wishlist={wishlist} onWishlist={onWishlist} onAdd={onAdd} />
          ) : !baseProducts.length ? (
            <div className="empty-state listing-empty">
              <p className="eyebrow">NEW ARRIVALS</p>
              <h2>Coming Soon</h2>
              <p>We are still preparing this collection. Browse everything in the meantime.</p>
              <StoreLink href="/shop" navigate={navigate} className="button button-outline">Explore all pieces</StoreLink>
            </div>
          ) : (
            <div className="empty-state listing-empty">
              <p className="eyebrow">A QUIETER CORNER</p>
              <h2>No pieces found.</h2>
              <p>Try adjusting your filters or searching for another colour or collection.</p>
              <button type="button" className="button button-outline" onClick={clearFilters}>Clear all filters</button>
            </div>
          )}
        </div>
      </div>
      </div>
      </div>
    </main>
  );
}

function FilterSidebar({
  products: filterProducts,
  categories,
  colors,
  maxPrice,
  filtersOpen,
  hasFilters,
  onClear,
  onCategoryToggle,
  onColorToggle,
  onPriceChange,
}: {
  products: Product[];
  categories: string[];
  colors: string[];
  maxPrice: number;
  filtersOpen: boolean;
  hasFilters: boolean;
  onClear: () => void;
  onCategoryToggle: (category: string) => void;
  onColorToggle: (color: string) => void;
  onPriceChange: (price: number) => void;
}) {
  const availableCategories = Array.from(new Set(filterProducts.map((item) => item.category)));
  const availableColors = Array.from(new Set(filterProducts.flatMap((item) => item.colors?.map((color) => color.name) || [])));
  return (
    <aside className={`filter-sidebar ${filtersOpen ? "filters-visible" : ""}`}>
      <div className="filter-heading">
        <span>Refine the edit</span>
        {hasFilters && <button type="button" className="text-button" onClick={onClear}>Clear all</button>}
      </div>
      {availableCategories.length > 1 && (
        <details open className="filter-group">
          <summary>Category <ChevronDown size={15} /></summary>
          <div className="filter-options">
            {availableCategories.map((category) => (
              <label key={category} className="check-option">
                <input type="checkbox" checked={categories.includes(category)} onChange={() => onCategoryToggle(category)} />
                <span>{category}</span><small>{filterProducts.filter((item) => item.category === category).length}</small>
              </label>
            ))}
          </div>
        </details>
      )}
      <details open className="filter-group">
        <summary>Price <ChevronDown size={15} /></summary>
        <div className="price-filter">
          <label htmlFor="price-range">Up to <strong>{formatPrice(maxPrice)}</strong></label>
          <input id="price-range" type="range" min="500" max="15000" step="250" value={maxPrice} onChange={(event) => onPriceChange(Number(event.target.value))} />
          <div className="range-labels"><span>PKR 500</span><span>PKR 15,000</span></div>
        </div>
      </details>
      {availableColors.length > 0 && (
        <details open className="filter-group">
          <summary>Colour <ChevronDown size={15} /></summary>
          <div className="filter-options">
            {availableColors.map((color) => {
              const swatch = filterProducts.flatMap((item) => item.colors || []).find((item) => item.name === color);
              return (
                <label key={color} className="check-option color-option">
                  <input type="checkbox" checked={colors.includes(color)} onChange={() => onColorToggle(color)} />
                  <span className="filter-swatch" style={{ backgroundColor: swatch?.hex }} />
                  <span>{color}</span>
                </label>
              );
            })}
          </div>
        </details>
      )}
    </aside>
  );
}

function ProductDetailPage({
  product,
  navigate,
  saved,
  onWishlist,
  onToggleProductWishlist,
  onAdd,
  onAddMany,
  onShare,
  wishlist,
}: {
  product: Product;
  navigate: Navigate;
  saved: boolean;
  onWishlist: () => void;
  onToggleProductWishlist: (productId: string) => void;
  onAdd: (productId: string, color?: string, size?: string, quantity?: number) => void;
  onAddMany: (picks: { productId: string; color: string }[], label: string, bundlePrice?: number) => void;
  onShare: () => void;
  wishlist: string[];
}) {
  const [imageIndex, setImageIndex] = useState(0);
  const related = [...products.filter((item) => item.id !== product.id && item.category === product.category)]
    .sort((x, y) => Number(y.subcategory === product.subcategory) - Number(x.subcategory === product.subcategory))
    .slice(0, 3);

  return (
    <main className="product-page page-shell">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: product.name }]} navigate={navigate} />
      <div className="product-detail-layout">
        <ProductGallery product={product} imageIndex={imageIndex} setImageIndex={setImageIndex} />
        {product.bundleOf ? (
          <BundleBuilder
            product={product}
            saved={saved}
            onWishlist={onWishlist}
            onShare={onShare}
            onAddMany={onAddMany}
            onColorChange={(color) => {
              const index = product.colorImages?.[color];
              if (index !== undefined) setImageIndex(index);
            }}
          />
        ) : (
        <ProductInfo
          product={product}
          saved={saved}
          onWishlist={onWishlist}
          onAdd={onAdd}
          onShare={onShare}
          onColorChange={(color) => {
            const index = product.colorImages?.[color];
            if (index !== undefined) setImageIndex(index);
          }}
        />
        )}
      </div>
      {related.length > 0 && (
        <section className="section related-section">
          <div className="section-heading section-heading-split">
            <div><p className="eyebrow">KEEP EXPLORING</p><h2>Pieces to Pair With</h2></div>
            <StoreLink href={`/collections/${categorySlug(product.category)}`} navigate={navigate} className="underlined-link">View collection <ArrowRight size={16} /></StoreLink>
          </div>
          <ProductGrid items={related} navigate={navigate} wishlist={wishlist} onWishlist={onToggleProductWishlist} onAdd={(productId, color, size) => onAdd(productId, color, size, 1)} />
        </section>
      )}
    </main>
  );
}

function ProductInfo({
  product,
  saved,
  onWishlist,
  onAdd,
  onShare,
  onColorChange,
}: {
  product: Product;
  saved: boolean;
  onWishlist: () => void;
  onAdd: (productId: string, color?: string, size?: string, quantity?: number) => void;
  onShare: () => void;
  onColorChange?: (color: string) => void;
}) {
  const [selectedColor, setSelectedColor] = useState(
    (product.colors?.find((color) => getStock(product, color.name) > 0) || product.colors?.[0])?.name || "One size",
  );
  const stock = getStock(product, selectedColor === "One size" ? undefined : selectedColor);
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0] || "");
  const [quantity, setQuantity] = useState(1);
  const addProduct = () => onAdd(product.id, selectedColor, selectedSize, quantity);

  return (
    <div className="product-info">
      <h1>{product.name}</h1>
      <div className="detail-price-row">
        <span className="detail-price">{formatPrice(product.price)}</span>
      </div>
      {stock < 1 && (
        <p className="stock-message sold-out"><span aria-hidden="true" />Out of stock</p>
      )}
      {product.colors && (
        <fieldset className="variant-fieldset">
          <legend>Colour <span>{selectedColor}</span></legend>
          <div className="color-choices">
            {product.colors.map((color) => (
              <button
                key={color.name}
                type="button"
                className={`color-choice ${selectedColor === color.name ? "is-selected" : ""} ${getStock(product, color.name) < 1 ? "is-soldout" : ""}`}
                style={{ "--swatch": color.hex } as CSSProperties}
                onClick={() => { setSelectedColor(color.name); setQuantity(1); onColorChange?.(color.name); }}
                aria-label={`Choose ${color.name}${getStock(product, color.name) < 1 ? " (out of stock)" : ""}`}
                aria-pressed={selectedColor === color.name}
                title={getStock(product, color.name) < 1 ? `${color.name} - out of stock` : color.name}
              >
                <span />
              </button>
            ))}
          </div>
        </fieldset>
      )}
      {product.sizes && (
        <fieldset className="variant-fieldset size-fieldset">
          <legend>Size <span>{selectedSize}</span></legend>
          <div className="size-choices">
            {product.sizes.map((size) => (
              <button key={size} type="button" className={selectedSize === size ? "is-selected" : ""} onClick={() => setSelectedSize(size)} aria-pressed={selectedSize === size}>{size}</button>
            ))}
          </div>
        </fieldset>
      )}
      <div className="quantity-label">Quantity</div>
      <div className="quantity-control" aria-label="Select quantity">
        <button type="button" aria-label="Decrease quantity" disabled={quantity <= 1} onClick={() => setQuantity((value) => Math.max(1, value - 1))}><Minus size={15} /></button>
        <span aria-live="polite">{quantity}</span>
        <button type="button" aria-label="Increase quantity" disabled={quantity >= stock} onClick={() => setQuantity((value) => Math.min(stock, value + 1))}><Plus size={15} /></button>
      </div>
      <div className="product-actions">
        <button type="button" className="button button-outline button-full" onClick={addProduct} disabled={stock < 1}>
          {stock < 1 ? "Out of stock" : "Add to cart"}
        </button>
        <button type="button" className="button button-dark button-full" onClick={addProduct} disabled={stock < 1}>
          Buy it now
        </button>
      </div>
      <DeliveryTimeline />
      <div className="product-specs">
        {product.size && <p><strong>Size:</strong> {product.size}</p>}
        {product.fabric && <p><strong>Fabric:</strong> {product.fabric}</p>}
        <RichDescription text={product.description} />
        {product.details.map((detail) => <p key={detail}>{detail}</p>)}
        {product.care && <p><strong>Care:</strong> {product.care}</p>}
      </div>
      <div className="detail-utility-actions">
        <button type="button" className={`detail-utility ${saved ? "is-saved" : ""}`} onClick={onWishlist} aria-pressed={saved}>
          <Heart size={17} fill={saved ? "currentColor" : "none"} /> {saved ? "Saved to wishlist" : "Save to wishlist"}
        </button>
        <button type="button" className="detail-utility" onClick={onShare}><Share2 size={17} /> Share this piece</button>
      </div>
    </div>
  );
}

function BundleBuilder({
  product,
  saved,
  onWishlist,
  onShare,
  onAddMany,
  onColorChange,
}: {
  product: Product;
  saved: boolean;
  onWishlist: () => void;
  onShare: () => void;
  onAddMany: (picks: { productId: string; color: string }[], label: string, bundlePrice?: number) => void;
  onColorChange: (color: string) => void;
}) {
  const options = useMemo(() => getBundleOptions(product.bundleOf || ""), [product.bundleOf]);
  const availableCounts = Object.keys(product.bundlePrices || {}).map(Number).sort((a, b) => a - b);
  const initialCount = availableCounts[0] || BUNDLE_MIN;
  const [count, setCount] = useState(initialCount);
  const [picks, setPicks] = useState<(BundleOption | null)[]>(() => Array(initialCount).fill(null));
  const [active, setActive] = useState(0);
  const counts = availableCounts;

  const chooseCount = (next: number) => {
    setCount(next);
    setPicks((current) => Array.from({ length: next }, (_, index) => current[index] ?? null));
    setActive((current) => Math.min(current, next - 1));
  };
  const totalAvailable = options.reduce((sum, option) => sum + option.stock, 0);
  const usedElsewhere = (option: BundleOption) =>
    picks.filter((pick, index) => index !== active && pick?.productId === option.productId && pick.color === option.color).length;
  const unavailable = (option: BundleOption) => option.stock < 1 || usedElsewhere(option) >= option.stock;
  const choose = (option: BundleOption) => {
    if (unavailable(option)) return;
    const next = [...picks];
    next[active] = option;
    setPicks(next);
    onColorChange(option.color);
    const nextEmpty = next.findIndex((item, index) => !item && index !== active);
    if (nextEmpty >= 0) setActive(nextEmpty);
  };
  const filled = picks.filter(Boolean) as BundleOption[];
  const complete = filled.length === count;
  const tierPrice = product.bundlePrices?.[count] ?? 0;
  const single = options[0]?.price ?? 0;
  const total = tierPrice;
  const activePick = picks[active];

  return (
    <div className="product-info bundle-builder">
      <h1>{product.name}</h1>
      <div className="detail-price-row">
        <span className="detail-price">{formatPrice(tierPrice)}</span>
        <span className="bundle-per-piece">for {count} pieces · {formatPrice(tierPrice / count)} each{single * count > tierPrice ? ` · save ${formatPrice(single * count - tierPrice)}` : ""}</span>
      </div>
      <p className="bundle-per-piece">Individual {product.bundleOf} products are available separately at {formatPrice(single)} each.</p>
      <fieldset className="variant-fieldset">
        <legend>Number of pieces <span>{count}</span></legend>
        <div className="bundle-count">
          {counts.map((number) => (
            <button key={number} type="button" disabled={number > totalAvailable} className={count === number ? "is-selected" : ""} aria-pressed={count === number} onClick={() => chooseCount(number)}>{number}</button>
          ))}
        </div>
      </fieldset>
      <fieldset className="variant-fieldset">
        <legend>Pick colour for piece {active + 1} <span>{activePick?.color || "Select a colour"}</span></legend>
        <div className="color-choices">
          {options.map((option) => (
            <button
              key={`${option.productId}-${option.color}`}
              type="button"
              className={`color-choice ${activePick?.productId === option.productId && activePick?.color === option.color ? "is-selected" : ""} ${unavailable(option) ? "is-soldout" : ""}`}
              disabled={unavailable(option)}
              style={{ "--swatch": option.hex } as CSSProperties}
              onClick={() => choose(option)}
              onMouseEnter={() => onColorChange(option.color)}
              aria-label={`Choose ${option.color} for piece ${active + 1}${unavailable(option) ? " (out of stock)" : ""}`}
              title={unavailable(option) ? `${option.color} - out of stock` : option.color}
            >
              <span />
            </button>
          ))}
        </div>
      </fieldset>
      <div className="bundle-slots" role="list" aria-label="Your bundle">
        {picks.map((pick, index) => (
          <button key={index} type="button" role="listitem" className={`bundle-slot ${active === index ? "is-active" : ""} ${pick ? "is-filled" : ""}`} onClick={() => { setActive(index); if (pick) onColorChange(pick.color); }}>
            <span className="bundle-slot-dot" style={{ background: pick?.hex || "transparent" }} />
            <span className="bundle-slot-text"><small>Piece {index + 1}</small><strong>{pick?.color || "Choose colour"}</strong></span>
            {pick && <span className="bundle-slot-price">{formatPrice(tierPrice / count)}</span>}
          </button>
        ))}
      </div>
      <div className="bundle-total">
        <span>{filled.length} of {count} chosen</span>
        <strong>{formatPrice(total)}</strong>
      </div>
      <div className="product-actions">
        <button
          type="button"
          className="button button-dark button-full"
          disabled={!complete}
          onClick={() => onAddMany(filled.map((option) => ({ productId: option.productId, color: option.color })), product.name, tierPrice)}
        >
          <ShoppingBag size={17} /> {complete ? `Add ${count} pieces to bag` : `Choose ${count - filled.length} more ${count - filled.length === 1 ? "colour" : "colours"}`}
        </button>
      </div>
      <DeliveryTimeline />
      <div className="product-specs">
        <RichDescription text={product.description} />
      </div>
      <div className="detail-utility-actions">
        <button type="button" className={`detail-utility ${saved ? "is-saved" : ""}`} onClick={onWishlist} aria-pressed={saved}>
          <Heart size={17} fill={saved ? "currentColor" : "none"} /> {saved ? "Saved to wishlist" : "Save to wishlist"}
        </button>
        <button type="button" className="detail-utility" onClick={onShare}><Share2 size={17} /> Share this piece</button>
      </div>
    </div>
  );
}

function RichDescription({ text }: { text: string }) {
  const renderLine = (line: string) => {
    const normalized = line.replace(/^([^:*]{2,45})\s*:/, "*$1*:");
    return normalized.split(/(\*[^*]+\*)/g).map((part, i) =>
      part.startsWith("*") && part.endsWith("*") && part.length > 2 ? <strong key={i}>{part.slice(1, -1)}</strong> : part,
    );
  };
  // Paragraphs follow the blank lines written in the product description; lines inside a paragraph stay together.
  const blocks = text
    .split(/\n\s*\n/)
    .map((block) => block.split("\n").map((line) => line.trim()).filter(Boolean))
    .filter((lines) => lines.length);
  return (
    <div className="rich-description">
      {blocks.map((lines, index) => (
        <p key={index}>
          {lines.map((line, lineIndex) => (
            <span key={lineIndex}>{lineIndex > 0 && <br />}{renderLine(line)}</span>
          ))}
        </p>
      ))}
    </div>
  );
}

function productImage(product: Product, color?: string) {
  const index = color ? product.colorImages?.[color] : undefined;
  return product.images[index ?? 0] || product.images[0];
}

function categorySlug(category: string) {
  return category.toLowerCase().replace(/ /g, "-");
}

function ProductGallery({
  product,
  imageIndex,
  setImageIndex,
}: {
  product: Product;
  imageIndex: number;
  setImageIndex: (index: number) => void;
}) {
  const currentImage = product.images[imageIndex] || product.images[0];
  return (
    <div className="product-gallery">
      <div className={`product-gallery-main ${product.bundleOf ? "is-bundle" : ""}`}>
        <StoreImage src={currentImage} alt={`${product.name} product view ${imageIndex + 1}`} />
        {product.images.length > 1 && (
          <>
            <button className="gallery-arrow gallery-prev" type="button" aria-label="Previous product image" onClick={() => setImageIndex((imageIndex - 1 + product.images.length) % product.images.length)}><ChevronLeft size={20} /></button>
            <button className="gallery-arrow gallery-next" type="button" aria-label="Next product image" onClick={() => setImageIndex((imageIndex + 1) % product.images.length)}><ChevronRight size={20} /></button>
          </>
        )}
      </div>
      <div className="product-gallery-thumbs" aria-label="Product images" hidden={product.images.length < 2}>
        {product.images.map((image, index) => (
          <button key={`${image}-${index}`} type="button" className={imageIndex === index ? "is-current" : ""} onClick={() => setImageIndex(index)} aria-label={`Show image ${index + 1}`} aria-pressed={imageIndex === index}>
            <StoreImage src={image} alt="" />
          </button>
        ))}
      </div>
    </div>
  );
}

function DeliveryTimeline() {
  const dayLabel = (offset: number) => {
    const date = new Date();
    date.setDate(date.getDate() + offset);
    return date;
  };
  const month = (date: Date) => date.toLocaleDateString("en-US", { month: "short" });
  const day = (date: Date) => String(date.getDate()).padStart(2, "0");
  const single = (offset: number) => `${month(dayLabel(offset))} ${day(dayLabel(offset))}`;
  const range = (from: number, to: number) => {
    const start = dayLabel(from);
    const end = dayLabel(to);
    return month(start) === month(end) ? `${month(start)} ${day(start)} - ${day(end)}` : `${month(start)} ${day(start)} - ${month(end)} ${day(end)}`;
  };
  return (
    <section className="delivery-timeline tl" aria-label="Estimated delivery timeline">
      <div className="tl-icons">
        <span className="tl-icon"><ShoppingBag size={44} strokeWidth={1.3} /></span>
        <span className="tl-line" aria-hidden="true" />
        <span className="tl-icon"><Truck size={44} strokeWidth={1.3} /></span>
        <span className="tl-line" aria-hidden="true" />
        <span className="tl-icon"><MapPin size={44} strokeWidth={1.3} /></span>
      </div>
      <div className="tl-labels">
        <div><strong>Purchased</strong><span>{single(0)}</span></div>
        <div><strong>Processing</strong><span>{range(0, 2)}</span></div>
        <div><strong>Delivered</strong><span>{range(3, 7)}</span></div>
      </div>
    </section>
  );
}

function WishlistPage({
  items,
  wishlist,
  navigate,
  onWishlist,
  onAdd,
}: {
  items: Product[];
  wishlist: string[];
  navigate: Navigate;
  onWishlist: (productId: string) => void;
  onAdd: (productId: string, color?: string, size?: string, quantity?: number) => void;
}) {
  return (
    <main className="page-shell wishlist-page">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Wishlist" }]} navigate={navigate} />
      <div className="listing-intro">
        <p className="eyebrow">SAVED FOR ANOTHER DAY</p>
        <h1>Your Wishlist</h1>
        <p>A little collection of pieces you have your eye on.</p>
      </div>
      {items.length ? (
        <ProductGrid items={items} navigate={navigate} wishlist={wishlist} onWishlist={onWishlist} onAdd={onAdd} isWishlistPage={true} />
      ) : (
        <div className="empty-state wishlist-empty">
          <div className="empty-icon"><Heart size={28} strokeWidth={1.35} /></div>
          <h2>A quiet little list, for now.</h2>
          <p>Save the pieces you love and they will be waiting here for you.</p>
          <StoreLink className="button button-dark" href="/shop" navigate={navigate}>Explore the collection <ArrowRight size={16} /></StoreLink>
        </div>
      )}
    </main>
  );
}

function CartPage({
  lines,
  subtotal,
  shipping,
  total,
  navigate,
  onQuantityChange,
  onRemove,
  onClear,
}: {
  lines: CartProduct[];
  subtotal: number;
  shipping: number;
  total: number;
  navigate: Navigate;
  onQuantityChange: (line: CartLine, amount: number) => void;
  onRemove: (line: CartLine) => void;
  onClear: () => void;
}) {
  return (
    <main className="page-shell cart-page">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Your bag" }]} navigate={navigate} />
      <div className="listing-intro cart-intro">
        <p className="eyebrow">A FEW GOOD THINGS</p>
        <h1>Your Shopping Bag</h1>
        <p>Thoughtfully chosen, now on their way to you.</p>
      </div>
      {lines.length ? (
        <div className="cart-layout">
          <div className="cart-lines-column">
            <div className="cart-table-heading"><span>Your pieces ({lines.reduce((sum, item) => sum + item.quantity, 0)})</span><button type="button" className="text-button" onClick={onClear}>Clear bag</button></div>
            <div className="cart-lines-list">
              {lines.map((line) => <CartItem key={`${line.productId}-${line.color}-${line.size}-${line.unitPrice}`} line={line} navigate={navigate} onQuantityChange={onQuantityChange} onRemove={onRemove} />)}
            </div>
            <StoreLink href="/shop" navigate={navigate} className="continue-link"><ArrowLeft size={16} /> Continue shopping</StoreLink>
          </div>
          <OrderSummary subtotal={subtotal} shipping={shipping} total={total} navigate={navigate} actionLabel="Continue to checkout" />
        </div>
      ) : <EmptyCart navigate={navigate} />}
    </main>
  );
}

function CartItem({
  line,
  navigate,
  onQuantityChange,
  onRemove,
}: {
  line: CartProduct;
  navigate: Navigate;
  onQuantityChange: (line: CartLine, amount: number) => void;
  onRemove: (line: CartLine) => void;
}) {
  const variantLabel = [line.color !== "One size" ? line.color : "", line.size].filter(Boolean).join(" · ");
  return (
    <article className="cart-item">
      <StoreLink href={`/products/${line.product.slug}`} navigate={navigate} className="cart-item-image">
        <StoreImage src={productImage(line.product, line.color)} alt={line.product.name} />
      </StoreLink>
      <div className="cart-item-main">
        <span className="product-category">{line.product.category}</span>
        <StoreLink href={`/products/${line.product.slug}`} navigate={navigate} className="cart-item-title">{line.product.name}</StoreLink>
        {variantLabel && <span className="cart-variant">{variantLabel}</span>}
        <div className="cart-item-mobile-row">
          <div className="quantity-control compact" aria-label={`Quantity for ${line.product.name}`}>
            <button type="button" aria-label="Decrease quantity" onClick={() => onQuantityChange(line, -1)}><Minus size={13} /></button>
            <span>{line.quantity}</span>
            <button type="button" aria-label="Increase quantity" disabled={line.quantity >= getStock(line.product, line.color)} onClick={() => onQuantityChange(line, 1)}><Plus size={13} /></button>
          </div>
          <strong>{formatPrice(linePrice(line) * line.quantity)}</strong>
        </div>
      </div>
      <div className="cart-item-desktop-qty">
        <div className="quantity-control compact" aria-label={`Quantity for ${line.product.name}`}>
          <button type="button" aria-label="Decrease quantity" onClick={() => onQuantityChange(line, -1)}><Minus size={13} /></button>
          <span>{line.quantity}</span>
          <button type="button" aria-label="Increase quantity" disabled={line.quantity >= getStock(line.product, line.color)} onClick={() => onQuantityChange(line, 1)}><Plus size={13} /></button>
        </div>
      </div>
      <strong className="cart-item-total">{formatPrice(linePrice(line) * line.quantity)}</strong>
      <button className="remove-item" type="button" aria-label={`Remove ${line.product.name}`} onClick={() => onRemove(line)}><Trash2 size={16} /></button>
    </article>
  );
}

function OrderSummary({
  subtotal,
  shipping,
  total,
  navigate,
  actionLabel,
}: {
  subtotal: number;
  shipping: number;
  total: number;
  navigate: Navigate;
  actionLabel?: string;
}) {
  return (
    <aside className="order-summary">
      <p className="eyebrow">YOUR ORDER</p>
      <h2>Summary</h2>
      <div className="summary-line"><span>Subtotal</span><span>{formatPrice(subtotal)}</span></div>
      <div className="summary-line"><span>Delivery Charges (DC)</span><span>{shipping ? `DC: PKR ${SHIPPING_FEE}/-` : subtotal ? "Complimentary" : "—"}</span></div>
      <p className="shipping-rule">DC: PKR {SHIPPING_FEE}/- under {formatPrice(FREE_SHIPPING_THRESHOLD)}; complimentary at or above.</p>
      <div className="summary-total"><span>Estimated total</span><strong>{formatPrice(total)}</strong></div>
      {actionLabel && <StoreLink href="/checkout" navigate={navigate} className="button button-dark button-full">{actionLabel} <ArrowRight size={16} /></StoreLink>}
      <p className="cod-note"><CreditCard size={16} /> Cash on Delivery available</p>
    </aside>
  );
}

function EmptyCart({ navigate }: { navigate: Navigate }) {
  return (
    <div className="empty-state cart-empty">
      <div className="empty-icon"><ShoppingBag size={29} strokeWidth={1.35} /></div>
      <p className="eyebrow">A LITTLE ROOM FOR SOMETHING LOVELY</p>
      <h2>Your bag is waiting.</h2>
      <p>Explore the collection and find a piece that feels like you.</p>
      <StoreLink className="button button-dark" href="/shop" navigate={navigate}>Continue shopping <ArrowRight size={16} /></StoreLink>
    </div>
  );
}

function CartDrawer({
  open,
  onClose,
  lines,
  subtotal,
  shipping,
  total,
  navigate,
  onQuantityChange,
  onRemove,
}: {
  open: boolean;
  onClose: () => void;
  lines: CartProduct[];
  subtotal: number;
  shipping: number;
  total: number;
  navigate: Navigate;
  onQuantityChange: (line: CartLine, amount: number) => void;
  onRemove: (line: CartLine) => void;
}) {
  useEffect(() => {
    if (!open) return;
    const handleKey = (event: KeyboardEvent) => event.key === "Escape" && onClose();
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [open, onClose]);

  return (
    <div className={`drawer-layer cart-layer ${open ? "is-open" : ""}`} aria-hidden={!open}>
      <button className="drawer-backdrop" type="button" onClick={onClose} tabIndex={open ? 0 : -1} aria-label="Close shopping bag" />
      <aside className="cart-drawer" role="dialog" aria-modal="true" aria-label="Shopping bag">
        <div className="drawer-heading">
          <div><p className="eyebrow">THE PIECES YOU CHOSE</p><h2>Your bag <span>({lines.reduce((sum, line) => sum + line.quantity, 0)})</span></h2></div>
          <button className="icon-button" type="button" aria-label="Close shopping bag" onClick={onClose}><X size={22} /></button>
        </div>
        {lines.length ? (
          <>
            <div className="drawer-cart-lines">
              {lines.map((line) => <CartItem key={`${line.productId}-${line.color}-${line.size}-${line.unitPrice}`} line={line} navigate={navigate} onQuantityChange={onQuantityChange} onRemove={onRemove} />)}
            </div>
            <div className="drawer-summary">
              <div className="summary-line"><span>Subtotal</span><strong>{formatPrice(subtotal)}</strong></div>
              <p className="shipping-rule">{shipping ? `DC: PKR ${SHIPPING_FEE}/- applies.` : `Complimentary shipping at ${formatPrice(FREE_SHIPPING_THRESHOLD)} or more.`}</p>
              <button className="button button-dark button-full" type="button" onClick={() => navigate("/checkout")}>Continue to checkout <ArrowRight size={16} /></button>
              <button className="drawer-cart-link" type="button" onClick={() => navigate("/cart")}>View full bag <ArrowUpRight size={14} /></button>
              <span className="drawer-total-hidden" aria-hidden="true">{formatPrice(total)}</span>
            </div>
          </>
        ) : (
          <div className="drawer-empty">
            <div className="empty-icon"><ShoppingBag size={28} /></div>
            <h3>Your bag is waiting.</h3>
            <p>Beautiful things start with a little browsing.</p>
            <button className="button button-dark" type="button" onClick={() => navigate("/shop")}>Explore the collection <ArrowRight size={16} /></button>
          </div>
        )}
      </aside>
    </div>
  );
}

const WHATSAPP_NUMBER = "923170299682";

function buildWhatsAppOrderUrl(
  reference: string,
  values: CheckoutValues,
  lines: CartProduct[],
  subtotal: number,
  shipping: number,
  total: number,
) {
  const items = lines.map((line, index) => {
    const parts = [line.color && line.color !== "One size" ? `Colour: ${line.color}` : "", line.size ? `Size: ${line.size}` : ""].filter(Boolean);
    return `${index + 1}. ${line.product.name}${parts.length ? ` (${parts.join(", ")})` : ""}\n   Qty: ${line.quantity} × ${formatPrice(linePrice(line))} = ${formatPrice(linePrice(line) * line.quantity)}`;
  });
  const message = [
    "*New Order — RAH.*",
    `Order ref: ${reference}`,
    "",
    "*Order details*",
    ...items,
    "",
    `Subtotal: ${formatPrice(subtotal)}`,
    `DC: ${shipping ? `PKR ${SHIPPING_FEE}/-` : "Free"}`,
    `*Total: ${formatPrice(total)}*`,
    "Payment: Cash on Delivery",
    "",
    "*Customer details*",
    `Name: ${values.name.trim()}`,
    `Phone: ${values.phone.trim()}`,
    values.email.trim() ? `Email: ${values.email.trim()}` : null,
    `Address: ${values.address.trim()}`,
    `City: ${values.city.trim()}`,
    values.notes.trim() ? `Notes: ${values.notes.trim()}` : null,
  ].filter((line): line is string => line !== null).join("\n");
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

function CheckoutPage({
  lines,
  subtotal,
  shipping,
  total,
  navigate,
  onComplete,
}: {
  lines: CartProduct[];
  subtotal: number;
  shipping: number;
  total: number;
  navigate: Navigate;
  onComplete: () => void;
}) {
  const [confirmation, setConfirmation] = useState("");
  const [whatsAppUrl, setWhatsAppUrl] = useState("");
  const [values, setValues] = useState<CheckoutValues>({ name: "", email: "", phone: "", address: "", city: "", notes: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors: Record<string, string> = {};
    if (!values.name.trim()) nextErrors.name = "Please enter your full name.";
    if (values.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) nextErrors.email = "Enter a valid email address.";
    if (values.phone.replace(/\D/g, "").length < 10) nextErrors.phone = "Enter a phone number with at least 10 digits.";
    if (!values.address.trim()) nextErrors.address = "Please enter your delivery address.";
    if (!values.city.trim()) nextErrors.city = "Please enter your city.";
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;
    const reference = `RAH-${Date.now().toString(36).slice(-5).toUpperCase()}`;
    const url = buildWhatsAppOrderUrl(reference, values, lines, subtotal, shipping, total);
    setConfirmation(reference);
    setWhatsAppUrl(url);
    onComplete();
    if (!window.open(url, "_blank", "noopener")) window.location.href = url;
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const update = (field: keyof CheckoutValues, value: string) => {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: "" }));
  };

  if (confirmation) {
    return (
      <main className="page-shell checkout-page">
        <div className="confirmation-state">
          <div className="confirmation-icon"><Check size={27} /></div>
          <p className="eyebrow">ONE LAST STEP</p>
          <h1>Send your order on WhatsApp.</h1>
          <p className="confirmation-reference">Order reference <strong>{confirmation}</strong></p>
          <p className="confirmation-disclaimer">Your order details are ready in WhatsApp. Please press send in the chat so RAH. receives your order. If WhatsApp did not open, use the button below. Payment is Cash on Delivery.</p>
          <div className="confirmation-actions">
            <a className="button button-dark" href={whatsAppUrl} target="_blank" rel="noreferrer">Open WhatsApp <ArrowRight size={16} /></a>
            <StoreLink className="button button-outline" href="/shop" navigate={navigate}>Continue exploring <ArrowRight size={16} /></StoreLink>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="page-shell checkout-page">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Your bag", href: "/cart" }, { label: "Checkout" }]} navigate={navigate} />
      <div className="listing-intro checkout-intro">
        <p className="eyebrow">CHECKOUT</p>
        <h1>Delivery Details</h1>
        <p>Fill in your details and place your order. It will be sent to RAH. on WhatsApp.</p>
      </div>
      {!lines.length ? (
        <div className="empty-state checkout-empty">
          <h2>Your bag is empty.</h2><p>Add a piece before continuing to checkout.</p>
          <StoreLink className="button button-dark" href="/shop" navigate={navigate}>Browse the collection <ArrowRight size={16} /></StoreLink>
        </div>
      ) : (
        <div className="checkout-layout">
          <CheckoutForm values={values} errors={errors} onChange={update} onSubmit={handleSubmit} />
          <div className="checkout-order-column">
            <div className="checkout-order-items">
              <p className="eyebrow">IN YOUR BAG</p>
              {lines.map((line) => (
                <div className="checkout-order-item" key={`${line.productId}-${line.color}-${line.size}-${line.unitPrice}`}>
                  <StoreImage src={productImage(line.product, line.color)} alt="" />
                  <div><strong>{line.product.name}</strong><span>{line.quantity} × {formatPrice(linePrice(line))}</span></div>
                  <strong>{formatPrice(linePrice(line) * line.quantity)}</strong>
                </div>
              ))}
            </div>
            <OrderSummary subtotal={subtotal} shipping={shipping} total={total} navigate={navigate} />
          </div>
        </div>
      )}
    </main>
  );
}

function CheckoutForm({
  values,
  errors,
  onChange,
  onSubmit,
}: {
  values: CheckoutValues;
  errors: Record<string, string>;
  onChange: (field: keyof CheckoutValues, value: string) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
}) {
  return (
    <form className="checkout-form" onSubmit={onSubmit} noValidate>
      <div className="form-section-heading"><span>01</span><div><h2>Contact details</h2><p>Used only to deliver and confirm your order.</p></div></div>
      <div className="form-grid">
        <FormField label="Full name" name="name" value={values.name} onChange={(value) => onChange("name", value)} error={errors.name} autoComplete="name" />
        <FormField label="Email address (optional)" name="email" type="email" value={values.email} onChange={(value) => onChange("email", value)} error={errors.email} autoComplete="email" />
        <FormField label="Phone number" name="phone" type="tel" value={values.phone} onChange={(value) => onChange("phone", value)} error={errors.phone} autoComplete="tel" />
      </div>
      <div className="form-section-heading"><span>02</span><div><h2>Delivery address</h2><p>Nationwide delivery estimate: 3–7 days.</p></div></div>
      <div className="form-grid">
        <FormField className="field-full" label="Street address" name="address" value={values.address} onChange={(value) => onChange("address", value)} error={errors.address} autoComplete="street-address" />
        <FormField label="City" name="city" value={values.city} onChange={(value) => onChange("city", value)} error={errors.city} autoComplete="address-level2" />
        <label className="form-field field-full">
          <span>Order notes <small>Optional</small></span>
          <textarea value={values.notes} onChange={(event) => onChange("notes", event.target.value)} rows={3} placeholder="Gift message or delivery notes" />
        </label>
      </div>
      <div className="form-section-heading"><span>03</span><div><h2>Payment method</h2><p>Pay when your order arrives.</p></div></div>
      <label className="payment-method">
        <input type="radio" checked readOnly aria-label="Cash on Delivery selected" />
        <span className="payment-radio" />
        <span><strong>Cash on Delivery</strong><small>Pay in cash on delivery</small></span>
        <CreditCard size={20} />
      </label>
      <div className="checkout-disclaimer"><span>VIA WHATSAPP</span><p>Pressing “Place order” opens WhatsApp with your order and delivery details ready to send to RAH.</p></div>
      <button className="button button-dark button-full checkout-submit" type="submit">Place order <ArrowRight size={16} /></button>
    </form>
  );
}

function FormField({
  label,
  name,
  value,
  onChange,
  error,
  type = "text",
  className = "",
  autoComplete,
}: {
  label: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  type?: string;
  className?: string;
  autoComplete?: string;
}) {
  return (
    <label className={`form-field ${className}`}>
      <span>{label}</span>
      <input type={type} name={name} value={value} onChange={(event) => onChange(event.target.value)} autoComplete={autoComplete} aria-invalid={Boolean(error)} aria-describedby={error ? `${name}-error` : undefined} />
      {error && <small className="field-error" id={`${name}-error`}>{error}</small>}
    </label>
  );
}

function Breadcrumbs({ items, navigate }: { items: { label: string; href?: string }[]; navigate: Navigate }) {
  return (
    <nav className="breadcrumbs" aria-label="Breadcrumb">
      {items.map((item, index) => (
        <span key={`${item.label}-${index}`}>
          {index > 0 && <ChevronRight size={13} aria-hidden="true" />}
          {item.href && index < items.length - 1 ? <StoreLink href={item.href} navigate={navigate}>{item.label}</StoreLink> : <span aria-current={index === items.length - 1 ? "page" : undefined}>{item.label}</span>}
        </span>
      ))}
    </nav>
  );
}

type InfoBlock =
  | { type: "p"; text: string }
  | { type: "bold"; text: string }
  | { type: "list"; items: string[] };

type InfoContent = { eyebrow: string; title: string; intro?: string; blocks: InfoBlock[] };

const p = (text: string): InfoBlock => ({ type: "p", text });
const bold = (text: string): InfoBlock => ({ type: "bold", text });
const list = (items: string[]): InfoBlock => ({ type: "list", items });

const infoPageContent: Record<string, InfoContent> = {
  "our-story": {
    eyebrow: "OUR POINT OF VIEW",
    title: "Modesty, Made Meaningful",
    intro: "At RAH., the best pieces are the ones that feel like they have always belonged.",
    blocks: [
      p("RAH. is a modest fashion concept built around thoughtful selection, timeless shape, and the small details that make getting dressed feel personal."),
      p("From soft layers to considered gifts, every piece is chosen with care and packed with love."),
      p("We believe style can be both quiet and expressive: pieces made to move with you, and made meaningful by the way you wear them."),
    ],
  },
  shipping: {
    eyebrow: "CUSTOMER CARE",
    title: "Shipping Policy",
    blocks: [
      list([
        "Orders are dispatched within 24 hours.",
        "Delivery usually takes 2-5 working days after dispatch.",
        "Delivery times may vary due to courier delays or unforeseen circumstances.",
        "Shipping charges are calculated at checkout or communicated before dispatch.",
        "Once dispatched, tracking details will be shared with the customer",
      ]),
      p("Thank you for shopping with RAH. 🤍"),
    ],
  },
  exchange: {
    eyebrow: "CUSTOMER CARE",
    title: "Refund & Exchange Policy",
    blocks: [
      list([
        "Returns or exchanges can be requested within 2 days of receiving your order.",
        "Products must be unused, unwashed, and in their original packaging.",
        "Refunds are only applicable if an incorrect item is delivered by us. The incorrect item must be returned to RAH to be eligible for a refund.",
        "RAH is not responsible for items damaged during courier handling.",
      ]),
      p("For further information, kindly contact us through our official pages."),
      bold("The following are not eligible for refund or exchange:"),
      list([
        "Used or washed products",
        "Customized items",
        "Sale items",
        "Minor colour variations due to screen differences",
      ]),
      bold("Shipping Cost:"),
      p("In case of exchange requested by the customer, the customer is responsible for the shipping costs of sending the parcel back to By RAH. 🤍"),
      p("Approved refunds (if applicable) will be processed within 7-10 business days."),
      p("Thank you for shopping with RAH. 🤍"),
    ],
  },
  privacy: {
    eyebrow: "THE SMALL PRINT",
    title: "Privacy Policy",
    blocks: [
      p("At RAH, we value your privacy and are committed to protecting your personal information."),
      bold("Information We Collect:"),
      p("We collect your name, phone number, delivery address, and other details required to process your order."),
      bold("Use of Information:"),
      p("Your information is used to process orders, arrange deliveries, and communicate with you."),
      p("Thank you for trusting RAH. 🤍"),
    ],
  },
  terms: {
    eyebrow: "THE SMALL PRINT",
    title: "Terms & conditions",
    intro: "Please read these terms before placing an order with RAH.",
    blocks: [
      p("Prices are shown in PKR. Product availability and delivery dates are estimates and may change."),
      p("Orders are placed through WhatsApp and confirmed by our team. Payment is Cash on Delivery."),
    ],
  },
  contact: {
    eyebrow: "WE ARE HERE TO HELP",
    title: "Contact Us",
    blocks: [
      bold("We'd Love to Hear From You"),
      p("Have a question about your order, our products, or gifting options? Our team is always here to help you."),
      list(["📧 byrahofficial@gmail.com", "📱 WhatsApp: +92 3170299682", "📍 Pakistan"]),
      p("We usually respond within 24 hours."),
    ],
  },
  faqs: {
    eyebrow: "A FEW COMMON QUESTIONS",
    title: "FAQs",
    intro: "Answers to common questions shoppers ask about RAH.",
    blocks: [
      bold("Is Cash on Delivery available?"),
      p("Yes, Cash on Delivery is available on all orders."),
      bold("How long does delivery take?"),
      p("Orders are dispatched within 24 hours and typically arrive within 2-5 working days after dispatch."),
      bold("Can I exchange an item?"),
      p("Exchanges can be requested within 2 days of receiving your order. See our Refund & Exchange Policy for full details."),
      bold("How can I reach the team?"),
      p("Message us on WhatsApp at +92 317 0299682 or email byrahofficial@gmail.com."),
    ],
  },
};

function InfoBlockRenderer({ block }: { block: InfoBlock }) {
  if (block.type === "list") {
    return (
      <ul className="info-list">
        {block.items.map((item) => <li key={item}>{item}</li>)}
      </ul>
    );
  }
  if (block.type === "bold") {
    return <p className="info-bold">{block.text}</p>;
  }
  return <p>{block.text}</p>;
}

function InfoPage({ slug, navigate }: { slug: string; navigate: Navigate }) {
  const page = infoPageContent[slug] || infoPageContent["our-story"];
  return (
    <main className={`page-shell info-page ${slug === "contact" ? "contact-page" : ""}`}>
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: page.title }]} navigate={navigate} />
      <article className="info-article">
        <p className="eyebrow">{page.eyebrow}</p>
        <h1>{page.title}</h1>
        {page.intro && <p className="info-intro">{page.intro}</p>}
        <div className="info-body">
          {page.blocks.map((block, index) => <InfoBlockRenderer key={index} block={block} />)}
        </div>
        <StoreLink className="underlined-link" href="/shop" navigate={navigate}>Return to the collection <ArrowRight size={16} /></StoreLink>
      </article>
    </main>
  );
}

function NotFoundPage({ navigate }: { navigate: Navigate }) {
  return (
    <main className="page-shell not-found-page">
      <p className="eyebrow">A TURN IN THE WRONG DIRECTION</p>
      <h1>We could not find that page.</h1>
      <p>Let us take you back to BY RAH. Edit.</p>
      <StoreLink className="button button-dark" href="/" navigate={navigate}>Return home <ArrowRight size={16} /></StoreLink>
    </main>
  );
}

function Footer({ navigate }: { navigate: Navigate }) {
  return (
    <footer className="site-footer">
      <div className="footer-main">
        <div className="footer-brand-column">
          <StoreLink href="/" navigate={navigate} className="wordmark footer-wordmark">
            <img className="wordmark-logo" src={imageLibrary.logoDark} alt="RAH. — Modesty by RAH" />
          </StoreLink>
          <SocialIconRow className="footer-social-row" />
        </div>
        <div className="footer-link-column">
          <h2>Customer care</h2>
          <StoreLink href="/pages/contact" navigate={navigate}>Contact Us</StoreLink>
          <StoreLink href="/pages/shipping" navigate={navigate}>Shipping Policy</StoreLink>
          <StoreLink href="/pages/exchange" navigate={navigate}>Refund & Exchange Policy</StoreLink>
          <StoreLink href="/pages/privacy" navigate={navigate}>Privacy Policy</StoreLink>
        </div>
        <div className="footer-contact-column">
          <h2>Get in touch</h2>
          <a href="mailto:byrahofficial@gmail.com"><Mail size={17} /> byrahofficial@gmail.com</a>
          <a href="https://wa.me/923170299682" target="_blank" rel="noreferrer"><Phone size={17} /> WhatsApp</a>
          <p><MapPin size={17} /> Khanewal, Pakistan</p>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="footer-tagline">
          <span>Modesty by RAH</span>
          <span>Curated with LOVE &amp; CARE for YOU 🤍</span>
        </div>
        <button type="button" className="back-to-top" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>Back to top <ArrowRight size={14} /></button>
      </div>
    </footer>
  );
}

function StoreImage({ src, alt }: { src: string; alt: string }) {
  const [failed, setFailed] = useState(false);
  useEffect(() => setFailed(false), [src]);
  return (
    <img
      src={failed ? imageLibrary.hero : src}
      alt={alt}
      loading="lazy"
      decoding="async"
      onError={() => setFailed(true)}
    />
  );
}

const socialIconPaths: Record<string, ReactNode> = {
  Instagram: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4.1" />
      <circle cx="17.1" cy="6.9" r="1.1" fill="currentColor" stroke="none" />
    </>
  ),
  Facebook: (
    <path d="M14.5 21v-7.8h2.6l.4-3h-3V8.2c0-.87.24-1.46 1.5-1.46h1.6V4.1C16.9 4.04 16 3.97 15 3.97c-2.1 0-3.5 1.28-3.5 3.63v2.6H9v3h2.5V21h3z" strokeLinejoin="round" />
  ),
  TikTok: (
    <path d="M14 3.5c.5 1.9 1.8 3.2 3.9 3.4v2.6c-1.4 0-2.7-.4-3.9-1.2v6.1c0 3-2.4 5.1-5.2 5.1-2.9 0-5.2-2.3-5.2-5.2 0-2.9 2.5-5.3 5.5-5.1v2.6c-1.5-.2-2.9.9-2.9 2.5 0 1.4 1.2 2.6 2.7 2.6 1.5 0 2.8-1.1 2.8-2.9V3.5h2.3z" strokeLinejoin="round" />
  ),
};

function SocialIconRow({ className = "" }: { className?: string }) {
  return (
    <div className={`social-icon-row ${className}`}>
      {socialLinks.map((social) => (
        <a
          key={social.label}
          href={social.href}
          target="_blank"
          rel="noreferrer"
          className="social-icon-link"
          aria-label={`Visit RAH. on ${social.label}`}
        >
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth={1.6} aria-hidden="true">
            {socialIconPaths[social.label]}
          </svg>
        </a>
      ))}
    </div>
  );
}

export default App;