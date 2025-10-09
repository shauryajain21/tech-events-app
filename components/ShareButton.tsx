'use client';

import { useState } from 'react';
import { Event } from '@/lib/types';
import { Share2, Link, Mail, Check } from 'lucide-react';

interface ShareButtonProps {
  event: Event;
}

export default function ShareButton({ event }: ShareButtonProps) {
  const [showMenu, setShowMenu] = useState(false);
  const [copied, setCopied] = useState(false);

  const formatEventText = () => {
    return `${event.title}\n📅 ${event.date}${event.time ? ` at ${event.time}` : ''}\n📍 ${event.venue}\n\n${event.description}${event.url ? `\n\n🔗 ${event.url}` : ''}`;
  };

  const handleCopyText = async () => {
    try {
      await navigator.clipboard.writeText(formatEventText());
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
        setShowMenu(false);
      }, 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  const handleCopyUrl = async () => {
    if (event.url) {
      try {
        await navigator.clipboard.writeText(event.url);
        setCopied(true);
        setTimeout(() => {
          setCopied(false);
          setShowMenu(false);
        }, 2000);
      } catch (error) {
        console.error('Failed to copy URL:', error);
      }
    }
  };

  const handleWebShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: event.title,
          text: formatEventText(),
          url: event.url,
        });
        setShowMenu(false);
      } catch (error) {
        console.error('Error sharing:', error);
      }
    }
  };

  const handleEmailShare = () => {
    const subject = encodeURIComponent(event.title);
    const body = encodeURIComponent(formatEventText());
    window.open(`mailto:?subject=${subject}&body=${body}`, '_blank');
    setShowMenu(false);
  };

  return (
    <div className="relative">
      <button
        onClick={(e) => {
          e.stopPropagation();
          setShowMenu(!showMenu);
        }}
        className="p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors duration-200"
        aria-label="Share event"
      >
        <Share2 className="w-5 h-5" />
      </button>

      {showMenu && (
        <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-xl overflow-hidden z-10">
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleCopyText();
            }}
            className="w-full px-4 py-3 text-left text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center space-x-2 transition-colors duration-150"
          >
            {copied ? <Check className="w-4 h-4" /> : <Link className="w-4 h-4" />}
            <span>{copied ? 'Copied!' : 'Copy Details'}</span>
          </button>

          {event.url && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleCopyUrl();
              }}
              className="w-full px-4 py-3 text-left text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center space-x-2 transition-colors duration-150"
            >
              <Link className="w-4 h-4" />
              <span>Copy URL</span>
            </button>
          )}

          {typeof navigator !== 'undefined' && 'share' in navigator && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleWebShare();
              }}
              className="w-full px-4 py-3 text-left text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center space-x-2 transition-colors duration-150"
            >
              <Share2 className="w-4 h-4" />
              <span>Share</span>
            </button>
          )}

          <button
            onClick={(e) => {
              e.stopPropagation();
              handleEmailShare();
            }}
            className="w-full px-4 py-3 text-left text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center space-x-2 transition-colors duration-150"
          >
            <Mail className="w-4 h-4" />
            <span>Email</span>
          </button>
        </div>
      )}
    </div>
  );
}
