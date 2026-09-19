import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Bell,
  Check,
  CheckCircle2,
  Film,
  Flame,
  Heart,
  Trash2,
  Tv,
} from "lucide-react";
import Footer from "../components/layout/Footer";
import "./NotificationsPage.css";

const INITIAL_NOTIFICATIONS = [
  {
    id: 1,
    type: "movie",
    title: "Dune: Part Three announced",
    message: "The first official teaser is now available.",
    time: "2 min ago",
    read: false,
  },
  {
    id: 2,
    type: "favorite",
    title: "Interstellar rating changed",
    message: "The community rating is now 8.8.",
    time: "1 hour ago",
    read: false,
  },
  {
    id: 3,
    type: "tv",
    title: "The Boys — season 5",
    message: "A new episode is ready to watch.",
    time: "Today",
    read: true,
  },
  {
    id: 4,
    type: "trending",
    title: "Oppenheimer is trending",
    message: "It is currently ranked #1 worldwide.",
    time: "Yesterday",
    read: true,
  },
];

const NOTIFICATION_META = {
  movie: {
    label: "Movie",
    Icon: Film,
  },
  favorite: {
    label: "Favorite",
    Icon: Heart,
  },
  tv: {
    label: "TV",
    Icon: Tv,
  },
  trending: {
    label: "Trending",
    Icon: Flame,
  },
};

function NotificationIcon({ type }) {
  const meta =
    NOTIFICATION_META[type] || {
      label: "Update",
      Icon: Bell,
    };

  const Icon = meta.Icon;

  return (
    <div className="notification-icon" aria-hidden="true">
      <Icon size={18} strokeWidth={1.6} />
    </div>
  );
}

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState(
    INITIAL_NOTIFICATIONS
  );

  const unreadCount = useMemo(
    () =>
      notifications.filter(
        (notification) => !notification.read
      ).length,
    [notifications]
  );

  function markRead(id) {
    setNotifications((current) =>
      current.map((notification) =>
        notification.id === id
          ? { ...notification, read: true }
          : notification
      )
    );
  }

  function removeNotification(id) {
    setNotifications((current) =>
      current.filter(
        (notification) => notification.id !== id
      )
    );
  }

  function markAllRead() {
    setNotifications((current) =>
      current.map((notification) => ({
        ...notification,
        read: true,
      }))
    );
  }

  function clearAll() {
    setNotifications([]);
  }

  return (
    <main className="notifications-page">
      <div
        className="notifications-ambient"
        aria-hidden="true"
      />

      <section className="notifications-container">
        <header className="notifications-header">
          <div className="notifications-heading">
            <div className="notifications-kicker">
              <Bell size={13} strokeWidth={1.7} />
              Your updates
            </div>

            <h1>
              Notifications<span>.</span>
            </h1>

            <p>
              A quiet place for the things worth knowing
              about.
            </p>
          </div>

          {notifications.length > 0 && (
            <div className="notifications-actions">
              {unreadCount > 0 && (
                <button
                  type="button"
                  className="notification-action"
                  onClick={markAllRead}
                >
                  <CheckCircle2
                    size={15}
                    strokeWidth={1.6}
                  />
                  Mark all read
                </button>
              )}

              <button
                type="button"
                className="notification-action danger"
                onClick={clearAll}
              >
                <Trash2
                  size={15}
                  strokeWidth={1.6}
                />
                Clear all
              </button>
            </div>
          )}
        </header>

        {notifications.length > 0 ? (
          <>
            <div className="notification-summary">
              <span>
                {notifications.length}{" "}
                {notifications.length === 1
                  ? "notification"
                  : "notifications"}
              </span>

              {unreadCount > 0 ? (
                <strong>
                  {unreadCount} unread
                </strong>
              ) : (
                <strong className="caught-up">
                  <Check size={13} />
                  All caught up
                </strong>
              )}
            </div>

            <section
              className="notification-list"
              aria-label="Notifications"
            >
              <AnimatePresence mode="popLayout">
                {notifications.map(
                  (notification, index) => {
                    const meta =
                      NOTIFICATION_META[
                        notification.type
                      ] || {
                        label: "Update",
                      };

                    return (
                      <motion.article
                        key={notification.id}
                        layout
                        initial={{
                          opacity: 0,
                          y: 10,
                        }}
                        animate={{
                          opacity: 1,
                          y: 0,
                        }}
                        exit={{
                          opacity: 0,
                          x: 20,
                          height: 0,
                          marginBottom: 0,
                        }}
                        transition={{
                          duration: 0.25,
                          delay: index * 0.035,
                          ease: "easeOut",
                        }}
                        className={
                          notification.read
                            ? "notification-item"
                            : "notification-item unread"
                        }
                      >
                        {!notification.read && (
                          <span
                            className="unread-dot"
                            aria-label="Unread"
                          />
                        )}

                        <NotificationIcon
                          type={notification.type}
                        />

                        <div className="notification-content">
                          <div className="notification-top">
                            <span className="notification-type">
                              {meta.label}
                            </span>

                            <time>
                              {notification.time}
                            </time>
                          </div>

                          <h2>
                            {notification.title}
                          </h2>

                          <p>
                            {notification.message}
                          </p>

                          {!notification.read && (
                            <button
                              type="button"
                              className="mark-read-button"
                              onClick={() =>
                                markRead(
                                  notification.id
                                )
                              }
                            >
                              <CheckCircle2
                                size={14}
                                strokeWidth={1.7}
                              />
                              Mark as read
                            </button>
                          )}
                        </div>

                        <button
                          type="button"
                          className="notification-delete"
                          onClick={() =>
                            removeNotification(
                              notification.id
                            )
                          }
                          aria-label={`Delete ${notification.title}`}
                          title="Delete notification"
                        >
                          <Trash2
                            size={15}
                            strokeWidth={1.6}
                          />
                        </button>
                      </motion.article>
                    );
                  }
                )}
              </AnimatePresence>
            </section>
          </>
        ) : (
          <motion.section
            className="notifications-empty"
            initial={{
              opacity: 0,
              y: 12,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
          >
            <div className="empty-bell">
              <Bell
                size={25}
                strokeWidth={1.5}
              />
            </div>

            <span className="notifications-kicker">
              Nothing waiting
            </span>

            <h2>
              You are all
              <em> caught up.</em>
            </h2>

            <p>
              New updates will appear here when something
              changes.
            </p>
          </motion.section>
        )}
      </section>

      <Footer />
    </main>
  );
}