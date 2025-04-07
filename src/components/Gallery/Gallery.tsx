"use client"

import type React from "react"
import { useEffect, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
// import { X } from "lucide-react"
import "./Gallery.css"

// MediaItemType defines the structure of a media item
interface MediaItemType {
  id: number
  type: string
  title: string
  desc: string
  url: string
  span: string
}

// Helper function to convert Tailwind span classes to CSS classes
const getSpanClass = (span: string): string => {
  if (span.includes("md:col-span-1 md:row-span-3")) return "span-1x3"
  if (span.includes("md:col-span-2 md:row-span-2")) return "span-2x2"
  return ""
}

// MediaItem component renders either a video or image based on item.type
const MediaItem = ({ item, className, onClick }: { item: MediaItemType; className?: string; onClick?: () => void }) => {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isInView, setIsInView] = useState(false)
  const [isBuffering, setIsBuffering] = useState(true)

  // Intersection Observer to detect if video is in view
  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "50px",
      threshold: 0.1,
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        setIsInView(entry.isIntersecting)
      })
    }, options)

    if (videoRef.current) {
      observer.observe(videoRef.current)
    }

    return () => {
      if (videoRef.current) {
        observer.unobserve(videoRef.current)
      }
    }
  }, [])

  // Handle video play/pause based on visibility
  useEffect(() => {
    let mounted = true

    const handleVideoPlay = async () => {
      if (!videoRef.current || !isInView || !mounted) return

      try {
        if (videoRef.current.readyState >= 3) {
          setIsBuffering(false)
          await videoRef.current.play()
        } else {
          setIsBuffering(true)
          await new Promise((resolve) => {
            if (videoRef.current) {
              videoRef.current.oncanplay = resolve
            }
          })
          if (mounted) {
            setIsBuffering(false)
            await videoRef.current.play()
          }
        }
      } catch (error) {
        console.warn("Video playback failed:", error)
      }
    }

    if (isInView) {
      handleVideoPlay()
    } else if (videoRef.current) {
      videoRef.current.pause()
    }

    return () => {
      mounted = false
      if (videoRef.current) {
        videoRef.current.pause()
        videoRef.current.removeAttribute("src")
        videoRef.current.load()
      }
    }
  }, [isInView])

  // Render video or image based on item type
  if (item.type === "video") {
    return (
      <div className={`bento-gallery__media-container ${className || ""}`}>
        <video
          ref={videoRef}
          className="bento-gallery__media-video"
          onClick={onClick}
          playsInline
          muted
          loop
          preload="auto"
          style={{
            opacity: isBuffering ? 0.8 : 1,
            transition: "opacity 0.2s",
            transform: "translateZ(0)",
            willChange: "transform",
          }}
        >
          <source src={item.url} type="video/mp4" />
        </video>
        {isBuffering && (
          <div className="bento-gallery__media-loader">
            <div className="bento-gallery__media-spinner" />
          </div>
        )}
      </div>
    )
  }

  return (
    <img
      src={item.url || "/placeholder.svg"}
      alt={item.title}
      className={`bento-gallery__media-img ${className || ""}`}
      onClick={onClick}
      loading="lazy"
      decoding="async"
    />
  )
}

// GalleryModal component displays the selected media item in a modal
interface GalleryModalProps {
  selectedItem: MediaItemType
  isOpen: boolean
  onClose: () => void
  setSelectedItem: (item: MediaItemType | null) => void
  mediaItems: MediaItemType[]
}

const GalleryModal = ({ selectedItem, isOpen, onClose, setSelectedItem, mediaItems }: GalleryModalProps) => {
  const [dockPosition, setDockPosition] = useState({ x: 0, y: 0 })

  if (!isOpen) return null

  return (
    <>
      {/* Main Modal */}
      <motion.div
        initial={{ scale: 0.98 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.98 }}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 30,
        }}
        className="bento-gallery__modal"
      >
        {/* Main Content */}
        <div className="bento-gallery__modal-content">
          <div className="bento-gallery__modal-body">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedItem.id}
                className="bento-gallery__modal-media"
                initial={{ y: 20, scale: 0.97 }}
                animate={{
                  y: 0,
                  scale: 1,
                  transition: {
                    type: "spring",
                    stiffness: 500,
                    damping: 30,
                    mass: 0.5,
                  },
                }}
                exit={{
                  y: 20,
                  scale: 0.97,
                  transition: { duration: 0.15 },
                }}
                onClick={onClose}
              >
                <MediaItem item={selectedItem} className="bento-gallery__media" onClick={onClose} />
                <div className="bento-gallery__modal-caption">
                  <h3 className="bento-gallery__modal-title">{selectedItem.title}</h3>
                  <p className="bento-gallery__modal-desc">{selectedItem.desc}</p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Close Button */}
        <motion.button
          className="bento-gallery__modal-close"
          onClick={onClose}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          {/* <X className="w-3 h-3" /> */}
        </motion.button>
      </motion.div>

      {/* Draggable Dock */}
      <motion.div
        drag
        dragMomentum={false}
        dragElastic={0.1}
        initial={false}
        animate={{ x: dockPosition.x, y: dockPosition.y }}
        onDragEnd={(_, info) => {
          setDockPosition((prev) => ({
            x: prev.x + info.offset.x,
            y: prev.y + info.offset.y,
          }))
        }}
        className="bento-gallery__dock"
      >
        <motion.div className="bento-gallery__dock-inner">
          <div className="bento-gallery__dock-items">
            {mediaItems.map((item, index) => (
              <motion.div
                key={item.id}
                onClick={(e) => {
                  e.stopPropagation()
                  setSelectedItem(item)
                }}
                style={{
                  zIndex: selectedItem.id === item.id ? 30 : mediaItems.length - index,
                }}
                className={`bento-gallery__dock-item ${
                  selectedItem.id === item.id ? "bento-gallery__dock-item--active" : ""
                }`}
                initial={{ rotate: index % 2 === 0 ? -15 : 15 }}
                animate={{
                  scale: selectedItem.id === item.id ? 1.2 : 1,
                  rotate: selectedItem.id === item.id ? 0 : index % 2 === 0 ? -15 : 15,
                  y: selectedItem.id === item.id ? -8 : 0,
                }}
                whileHover={{
                  scale: 1.3,
                  rotate: 0,
                  y: -10,
                  transition: { type: "spring", stiffness: 400, damping: 25 },
                }}
              >
                <MediaItem item={item} className="bento-gallery__media" onClick={() => setSelectedItem(item)} />
                <div className="bento-gallery__dock-overlay" />
                {selectedItem.id === item.id && (
                  <motion.div
                    layoutId="activeGlow"
                    className="bento-gallery__dock-glow"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.2 }}
                  />
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </>
  )
}

interface InteractiveBentoGalleryProps {
  mediaItems: MediaItemType[]
  title: string
  description: string
}

const InteractiveBentoGallery: React.FC<InteractiveBentoGalleryProps> = ({ mediaItems, title, description }) => {
  const [selectedItem, setSelectedItem] = useState<MediaItemType | null>(null)
  const [items, setItems] = useState(mediaItems)
  const [isDragging, setIsDragging] = useState(false)

  return (
    <div className="bento-gallery">
      <div className="bento-gallery__header">
        <motion.h1
          className="bento-gallery__title"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {title}
        </motion.h1>
        <motion.p
          className="bento-gallery__description"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {description}
        </motion.p>
      </div>
      <AnimatePresence mode="wait">
        {selectedItem ? (
          <GalleryModal
            selectedItem={selectedItem}
            isOpen={true}
            onClose={() => setSelectedItem(null)}
            setSelectedItem={setSelectedItem}
            mediaItems={items}
          />
        ) : (
          <motion.div
            className="bento-gallery__grid"
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.1 },
              },
            }}
          >
            {items.map((item, index) => (
              <motion.div
                key={item.id}
                layoutId={`media-${item.id}`}
                className={`bento-gallery__item ${getSpanClass(item.span)}`}
                onClick={() => !isDragging && setSelectedItem(item)}
                variants={{
                  hidden: { y: 50, scale: 0.9, opacity: 0 },
                  visible: {
                    y: 0,
                    scale: 1,
                    opacity: 1,
                    transition: {
                      type: "spring",
                      stiffness: 350,
                      damping: 25,
                      delay: index * 0.05,
                    },
                  },
                }}
                whileHover={{ scale: 1.02 }}
                drag
                dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
                dragElastic={1}
                onDragStart={() => setIsDragging(true)}
                onDragEnd={(e, info) => {
                  setIsDragging(false)
                  const moveDistance = info.offset.x + info.offset.y
                  if (Math.abs(moveDistance) > 50) {
                    const newItems = [...items]
                    const draggedItem = newItems[index]
                    const targetIndex =
                      moveDistance > 0 ? Math.min(index + 1, items.length - 1) : Math.max(index - 1, 0)
                    newItems.splice(index, 1)
                    newItems.splice(targetIndex, 0, draggedItem)
                    setItems(newItems)
                  }
                }}
              >
                <MediaItem
                  item={item}
                  className="bento-gallery__media"
                  onClick={() => !isDragging && setSelectedItem(item)}
                />
                <motion.div
                  className="bento-gallery__caption"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="bento-gallery__caption-inner">
                    <div className="bento-gallery__caption-gradient" />
                    <h3 className="bento-gallery__caption-title">{item.title}</h3>
                    <p className="bento-gallery__caption-desc">{item.desc}</p>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default InteractiveBentoGallery

