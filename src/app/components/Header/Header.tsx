'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import styles from './Header.module.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  // 判断链接是否为当前激活状态
  const isActiveLink = (href: string) => {
    if (href === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(href);
  };

  // 监听滚动事件，增强吸顶效果
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 10);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 关闭移动端菜单时禁止body滚动
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  // 点击外部区域时收起搜索框
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (!target.closest(`.${styles.searchForm}`)) {
        setIsSearchExpanded(false);
      }
    };

    if (isSearchExpanded) {
      document.addEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isSearchExpanded]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
      setIsMenuOpen(false); // 搜索后关闭移动端菜单
      setIsSearchExpanded(false); // 搜索后收起搜索框
    }
  };

  const handleSearchButtonClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isSearchExpanded) {
      setIsSearchExpanded(true);
    } else if (searchQuery.trim()) {
      // 如果已展开且有搜索内容，执行搜索
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
      setIsSearchExpanded(false);
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className={`${styles.header} ${isScrolled ? styles.headerScrolled : ''}`}>
      <div className={styles.container}>
        {/* 左侧区域：Logo + 导航 */}
        <div className={styles.leftSection}>
          {/* Logo */}
          <Link href="/" className={styles.logo} onClick={closeMenu}>
            <span className={styles.logoIcon}>🏠</span>
            <span className={styles.logoText}>Home Fitness</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className={styles.nav}>
            <Link href="/" className={`${styles.navLink} ${isActiveLink('/') ? styles.active : ''}`}>
              Home
            </Link>
            <Link href="/category/affordable-home-gym-setups" className={`${styles.navLink} ${isActiveLink('/category/affordable-home-gym-setups') ? styles.active : ''}`}>
              Affordable Home Gym Setups
            </Link>
            <Link href="/category/family-kids-friendly-workouts" className={`${styles.navLink} ${isActiveLink('/category/family-kids-friendly-workouts') ? styles.active : ''}`}>
              Family Workouts
            </Link>
            <Link href="/category/strength-training-without-equipment" className={`${styles.navLink} ${isActiveLink('/category/strength-training-without-equipment') ? styles.active : ''}`}>
              Bodyweight Training
            </Link>
            <Link href="/category/motivation-habit-building-tips" className={`${styles.navLink} ${isActiveLink('/category/motivation-habit-building-tips') ? styles.active : ''}`}>
              Motivation Tips
            </Link>
          </nav>
        </div>

        {/* 右侧区域：搜索框 + 移动菜单按钮 */}
        <div className={styles.rightSection}>
          {/* Search Form */}
          <form onSubmit={handleSearch} className={`${styles.searchForm} ${isSearchExpanded ? styles.searchFormExpanded : ''}`}>
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`${styles.searchInput} ${isSearchExpanded ? styles.searchInputExpanded : ''}`}
            />
            <button 
              type="button" 
              onClick={handleSearchButtonClick}
              className={styles.searchButton} 
              aria-label="Search"
            >
              <svg className={styles.searchIcon} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path 
                  d="M9 17A8 8 0 1 0 9 1a8 8 0 0 0 0 16zM19 19l-4.35-4.35" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </form>

          {/* Mobile Menu Button */}
          <button 
            className={styles.menuButton}
            onClick={toggleMenu}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
          >
            <span className={`${styles.menuIcon} ${isMenuOpen ? styles.menuIconOpen : ''}`}>
              <span></span>
              <span></span>
              <span></span>
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className={`${styles.mobileNav} ${isMenuOpen ? styles.mobileNavOpen : ''}`}>
        <Link href="/" className={`${styles.mobileNavLink} ${isActiveLink('/') ? styles.active : ''}`} onClick={closeMenu}>
          Home
        </Link>
        <Link href="/category/affordable-home-gym-setups" className={`${styles.mobileNavLink} ${isActiveLink('/category/affordable-home-gym-setups') ? styles.active : ''}`} onClick={closeMenu}>
          Affordable Home Gym Setups
        </Link>
        <Link href="/category/family-kids-friendly-workouts" className={`${styles.mobileNavLink} ${isActiveLink('/category/family-kids-friendly-workouts') ? styles.active : ''}`} onClick={closeMenu}>
          Family & Kids Friendly Workouts
        </Link>
        <Link href="/category/strength-training-without-equipment" className={`${styles.mobileNavLink} ${isActiveLink('/category/strength-training-without-equipment') ? styles.active : ''}`} onClick={closeMenu}>
          Strength Training Without Equipment
        </Link>
        <Link href="/category/motivation-habit-building-tips" className={`${styles.mobileNavLink} ${isActiveLink('/category/motivation-habit-building-tips') ? styles.active : ''}`} onClick={closeMenu}>
          Motivation & Habit Building Tips
        </Link>
        
        {/* Mobile Search */}
        <form onSubmit={handleSearch} className={styles.mobileSearchForm}>
          <input
            type="text"
            placeholder="Search articles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={styles.mobileSearchInput}
          />
          <button type="submit" className={styles.mobileSearchButton}>
            Search
          </button>
        </form>
      </div>

      {/* Overlay */}
      {isMenuOpen && (
        <div className={styles.overlay} aria-hidden="true"></div>
      )}
    </header>
  );
};

export default Header; 