'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import styles from './Header.module.css';
import logoSvg from '../../logo.svg';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
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

  // 处理刷新跳转的函数
  const handleRefreshNavigation = (href: string) => {
    window.location.href = href;
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery.trim())}`;
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
      window.location.href = `/search?q=${encodeURIComponent(searchQuery.trim())}`;
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
          <a 
            href="/" 
            className={styles.logo} 
            onClick={(e) => {
              e.preventDefault();
              closeMenu();
              handleRefreshNavigation('/');
            }}
          >
            <Image 
              src={logoSvg} 
              alt="Home Fitness Logo" 
              width={38} 
              height={38} 
              className={styles.logoIcon}
            />
            <span className={styles.logoText}>Home Fitness</span>
          </a>

          {/* Desktop Navigation */}
          <nav className={styles.nav}>
            <a 
              href="/" 
              className={`${styles.navLink} ${isActiveLink('/') ? styles.active : ''}`}
              onClick={(e) => {
                e.preventDefault();
                handleRefreshNavigation('/');
              }}
            >
              Home
            </a>
            <a 
              href="/category/affordable-home-gym-setups" 
              className={`${styles.navLink} ${isActiveLink('/category/affordable-home-gym-setups') ? styles.active : ''}`}
              onClick={(e) => {
                e.preventDefault();
                handleRefreshNavigation('/category/affordable-home-gym-setups');
              }}
            >
              Affordable Home Gym Setups
            </a>
            <a 
              href="/category/family-kids-friendly-workouts" 
              className={`${styles.navLink} ${isActiveLink('/category/family-kids-friendly-workouts') ? styles.active : ''}`}
              onClick={(e) => {
                e.preventDefault();
                handleRefreshNavigation('/category/family-kids-friendly-workouts');
              }}
            >
              Family Workouts
            </a>
            <a 
              href="/category/strength-training-without-equipment" 
              className={`${styles.navLink} ${isActiveLink('/category/strength-training-without-equipment') ? styles.active : ''}`}
              onClick={(e) => {
                e.preventDefault();
                handleRefreshNavigation('/category/strength-training-without-equipment');
              }}
            >
              Bodyweight Training
            </a>
            <a 
              href="/category/motivation-habit-building-tips" 
              className={`${styles.navLink} ${isActiveLink('/category/motivation-habit-building-tips') ? styles.active : ''}`}
              onClick={(e) => {
                e.preventDefault();
                handleRefreshNavigation('/category/motivation-habit-building-tips');
              }}
            >
              Motivation Tips
            </a>
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
        <a 
          href="/" 
          className={`${styles.mobileNavLink} ${isActiveLink('/') ? styles.active : ''}`} 
          onClick={(e) => {
            e.preventDefault();
            closeMenu();
            handleRefreshNavigation('/');
          }}
        >
          Home
        </a>
        <a 
          href="/category/affordable-home-gym-setups" 
          className={`${styles.mobileNavLink} ${isActiveLink('/category/affordable-home-gym-setups') ? styles.active : ''}`} 
          onClick={(e) => {
            e.preventDefault();
            closeMenu();
            handleRefreshNavigation('/category/affordable-home-gym-setups');
          }}
        >
          Affordable Home Gym Setups
        </a>
        <a 
          href="/category/family-kids-friendly-workouts" 
          className={`${styles.mobileNavLink} ${isActiveLink('/category/family-kids-friendly-workouts') ? styles.active : ''}`} 
          onClick={(e) => {
            e.preventDefault();
            closeMenu();
            handleRefreshNavigation('/category/family-kids-friendly-workouts');
          }}
        >
          Family & Kids Friendly Workouts
        </a>
        <a 
          href="/category/strength-training-without-equipment" 
          className={`${styles.mobileNavLink} ${isActiveLink('/category/strength-training-without-equipment') ? styles.active : ''}`} 
          onClick={(e) => {
            e.preventDefault();
            closeMenu();
            handleRefreshNavigation('/category/strength-training-without-equipment');
          }}
        >
          Strength Training Without Equipment
        </a>
        <a 
          href="/category/motivation-habit-building-tips" 
          className={`${styles.mobileNavLink} ${isActiveLink('/category/motivation-habit-building-tips') ? styles.active : ''}`} 
          onClick={(e) => {
            e.preventDefault();
            closeMenu();
            handleRefreshNavigation('/category/motivation-habit-building-tips');
          }}
        >
          Motivation & Habit Building Tips
        </a>
        
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