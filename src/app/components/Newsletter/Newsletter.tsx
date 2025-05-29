'use client';

import { useState } from 'react';
import styles from './Newsletter.module.css';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim()) {
      setMessage('请输入邮箱地址');
      return;
    }

    setIsSubmitting(true);
    setMessage('');

    try {
      // 这里可以添加实际的订阅逻辑
      // 目前只是模拟提交
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setMessage('订阅成功！感谢您的关注。');
      setEmail('');
    } catch (error) {
      setMessage('订阅失败，请稍后重试。');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.ctaForm}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input 
          type="email" 
          placeholder="Enter your email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={styles.ctaInput}
          disabled={isSubmitting}
        />
        <button 
          type="submit" 
          className="btn btn-accent"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Subscribing...' : 'Subscribe Now'}
        </button>
      </form>
      {message && (
        <p className={`${styles.message} ${message.includes('成功') ? styles.success : styles.error}`}>
          {message}
        </p>
      )}
    </div>
  );
};

export default Newsletter; 