import { useCallback, useRef, useEffect } from 'react';

interface UseInfiniteScrollProps {
  loading: boolean;
  hasMore: boolean;
  onLoadMore: () => void;
  threshold?: number;
}

export function useInfiniteScroll({
  loading,
  hasMore,
  onLoadMore,
  threshold = 0.8,
}: UseInfiniteScrollProps) {
  const observer = useRef<IntersectionObserver>();
  const onLoadMoreRef = useRef(onLoadMore);

  // Keep the callback reference updated
  useEffect(() => {
    onLoadMoreRef.current = onLoadMore;
  }, [onLoadMore]);

  const lastElementRef = useCallback(
    (node: HTMLElement | null) => {
      if (loading) return;
      
      if (observer.current) {
        observer.current.disconnect();
      }

      observer.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && hasMore) {
            onLoadMoreRef.current();
          }
        },
        {
          root: null,
          rootMargin: '20px',
          threshold,
        }
      );

      if (node) {
        observer.current.observe(node);
      }
    },
    [loading, hasMore, threshold]
  );

  // Cleanup observer on unmount
  useEffect(() => {
    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, []);

  return { lastElementRef };
}