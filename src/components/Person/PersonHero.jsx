import { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowLeft,
  CalendarDays,
  Check,
  ChevronLeft,
  ChevronRight,
  Film,
  Heart,
  MapPin,
  Share2,
  Star,
  UserRound,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import "../../styles/person-hero.css";

const IMAGE_BASE = "https://image.tmdb.org/t/p";
const FAVORITES_KEY = "cristal-person-favorites";

/* =========================================================
   IMAGE
========================================================= */

function getImage(path, size = "w500") {
  if (!path) {
    return "/avatar-placeholder.png";
  }

  return `${IMAGE_BASE}/${size}${path}`;
}

/* =========================================================
   AGE
========================================================= */

function calculateAge(birthday, deathday) {
  if (!birthday) {
    return null;
  }

  const birth = new Date(birthday);
  const end = deathday ? new Date(deathday) : new Date();

  if (
    Number.isNaN(birth.getTime()) ||
    Number.isNaN(end.getTime())
  ) {
    return null;
  }

  let age =
    end.getFullYear() -
    birth.getFullYear();

  const monthDifference =
    end.getMonth() -
    birth.getMonth();

  if (
    monthDifference < 0 ||
    (
      monthDifference === 0 &&
      end.getDate() < birth.getDate()
    )
  ) {
    age--;
  }

  return age >= 0 ? age : null;
}

/* =========================================================
   DATE
========================================================= */

function formatDate(date) {
  if (!date) {
    return null;
  }

  const parsed = new Date(date);

  if (Number.isNaN(parsed.getTime())) {
    return date;
  }

  return parsed.toLocaleDateString(
    "en-US",
    {
      year: "numeric",
      month: "short",
      day: "numeric",
    }
  );
}

/* =========================================================
   GENDER
========================================================= */

function formatGender(gender) {
  const genders = {
    1: "Female",
    2: "Male",
    3: "Non-binary",
  };

  return genders[gender] || null;
}

/* =========================================================
   COMPONENT
========================================================= */

export default function PersonHero({
  person,
  images = [],
}) {
  const navigate = useNavigate();

  /* =======================================================
     PHOTO CAROUSEL
  ======================================================= */

  const photos = useMemo(() => {
    const gallery = Array.isArray(images)
      ? images
      : Array.isArray(
          person?.images?.profiles
        )
      ? person.images.profiles
      : [];

    const paths = gallery
      .map(
        (image) =>
          typeof image === "string"
            ? image
            : image?.file_path
      )
      .filter(Boolean);

    let ordered = [];

    if (person?.profile_path) {
      ordered = [
        person.profile_path,
        ...paths.filter(
          (path) =>
            path !== person.profile_path
        ),
      ];
    } else {
      ordered = paths;
    }

    const unique = Array.from(
      new Set(ordered)
    );

    return unique.slice(0, 8);
  }, [images, person]);

  const [photoIndex, setPhotoIndex] =
    useState(0);

  useEffect(() => {
    setPhotoIndex(0);
  }, [person?.id]);

  useEffect(() => {
    if (
      photos.length > 0 &&
      photoIndex >= photos.length
    ) {
      setPhotoIndex(0);
    }
  }, [
    photoIndex,
    photos.length,
  ]);

  function previousPhoto() {
    setPhotoIndex((current) => {
      if (!photos.length) {
        return 0;
      }

      return current === 0
        ? photos.length - 1
        : current - 1;
    });
  }

  function nextPhoto() {
    setPhotoIndex((current) => {
      if (!photos.length) {
        return 0;
      }

      return (
        (current + 1) %
        photos.length
      );
    });
  }

  /* =======================================================
     FAVORITES
  ======================================================= */

  const [favorites, setFavorites] =
    useState([]);

  useEffect(() => {
    try {
      const saved = JSON.parse(
        localStorage.getItem(
          FAVORITES_KEY
        ) || "[]"
      );

      setFavorites(
        Array.isArray(saved)
          ? saved
          : []
      );
    } catch (error) {
      console.warn(
        "Could not restore favorite people:",
        error
      );

      setFavorites([]);
    }
  }, []);

  const isFavorite = useMemo(() => {
    if (!person?.id) {
      return false;
    }

    return favorites.some(
      (item) =>
        item.id === person.id
    );
  }, [
    favorites,
    person?.id,
  ]);

  function toggleFavorite() {
    if (!person?.id) {
      return;
    }

    setFavorites((current) => {
      const exists = current.some(
        (item) =>
          item.id === person.id
      );

      const next = exists
        ? current.filter(
            (item) =>
              item.id !== person.id
          )
        : [
            ...current,
            {
              id: person.id,
              name: person.name,
              profile_path:
                person.profile_path,
              known_for_department:
                person.known_for_department,
            },
          ];

      localStorage.setItem(
        FAVORITES_KEY,
        JSON.stringify(next)
      );

      return next;
    });
  }

  /* =======================================================
     SHARE
  ======================================================= */

  const [linkCopied, setLinkCopied] =
    useState(false);

  const shareTimerRef =
    useRef(null);

  async function sharePerson() {
    const shareUrl =
      typeof window !== "undefined"
        ? window.location.href
        : "";

    if (!shareUrl) {
      return;
    }

    if (
      navigator.share
    ) {
      try {
        await navigator.share({
          title:
            person?.name ||
            "Person",
          text: `Discover ${person?.name || "this person"} on CRISTAL.`,
          url: shareUrl,
        });

        return;
      } catch (error) {
        if (
          error?.name ===
          "AbortError"
        ) {
          return;
        }
      }
    }

    try {
      if (
        navigator.clipboard &&
        window.isSecureContext
      ) {
        await navigator.clipboard.writeText(
          shareUrl
        );
      } else {
        const textarea =
          document.createElement(
            "textarea"
          );

        textarea.value =
          shareUrl;

        textarea.style.position =
          "fixed";
        textarea.style.opacity =
          "0";

        document.body.appendChild(
          textarea
        );

        textarea.focus();
        textarea.select();

        document.execCommand(
          "copy"
        );

        document.body.removeChild(
          textarea
        );
      }

      setLinkCopied(true);

      clearTimeout(
        shareTimerRef.current
      );

      shareTimerRef.current =
        setTimeout(() => {
          setLinkCopied(false);
        }, 2500);
    } catch (error) {
      console.warn(
        "Share failed:",
        error
      );
    }
  }

  useEffect(() => {
    return () => {
      clearTimeout(
        shareTimerRef.current
      );
    };
  }, []);

  /* =======================================================
     KEYBOARD NAVIGATION
  ======================================================= */

  useEffect(() => {
    if (photos.length <= 1) {
      return;
    }

    function handleKeyDown(event) {
      if (
        event.key === "ArrowLeft"
      ) {
        previousPhoto();
      }

      if (
        event.key === "ArrowRight"
      ) {
        nextPhoto();
      }
    }

    window.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () => {
      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, [photos.length]);

  /* =======================================================
     EMPTY STATE
  ======================================================= */

  if (!person) {
    return null;
  }

  /* =======================================================
     DERIVED DATA
  ======================================================= */

  const age = calculateAge(
    person.birthday,
    person.deathday
  );

  const gender = formatGender(
    person.gender
  );

  const aliases =
    Array.isArray(
      person.also_known_as
    )
      ? person.also_known_as
          .filter(Boolean)
          .slice(0, 3)
      : [];

  const knownFor =
    person.known_for_department ||
    person.department ||
    "Entertainment";

  const activePhoto =
    photos[photoIndex] ||
    person.profile_path ||
    null;

  /* =======================================================
     RENDER
  ======================================================= */

  return (
    <section className="person-hero">
      {/* Background */}

      <div
        className="person-hero-bg"
        style={{
          backgroundImage: activePhoto
            ? `url("${getImage(
                activePhoto,
                "w780"
              )}")`
            : "none",
        }}
        aria-hidden="true"
      />

      {/* Main overlay */}

      <div
        className="person-hero-overlay"
        aria-hidden="true"
      />

      <div
        className="person-hero-bottom-fade"
        aria-hidden="true"
      />

      {/* Content */}

      <div className="person-hero-container">

        {/* Back */}

        <button
          type="button"
          onClick={() =>
            navigate(-1)
          }
          className="person-hero-back"
        >
          <ArrowLeft size={17} />

          <span>Back</span>
        </button>

        {/* Main Grid */}

        <div className="person-hero-grid">

          {/* =================================================
              PROFILE
          ================================================= */}

          <div className="person-profile-wrapper">

            <div className="person-profile">

              {activePhoto ? (
                <img
                  key={activePhoto}
                  src={getImage(
                    activePhoto,
                    "w500"
                  )}
                  alt={
                    person.name ||
                    "Person"
                  }
                  className="person-profile-image"
                  loading="eager"
                  decoding="async"
                />
              ) : (
                <div className="person-profile-placeholder">
                  <UserRound
                    size={64}
                  />
                </div>
              )}

              {/* Previous */}

              {photos.length > 1 && (
                <>
                  <button
                    type="button"
                    className="
                      person-profile-nav
                      person-profile-nav-prev
                    "
                    onClick={
                      previousPhoto
                    }
                    aria-label="Previous photo"
                  >
                    <ChevronLeft
                      size={18}
                    />
                  </button>

                  {/* Next */}

                  <button
                    type="button"
                    className="
                      person-profile-nav
                      person-profile-nav-next
                    "
                    onClick={
                      nextPhoto
                    }
                    aria-label="Next photo"
                  >
                    <ChevronRight
                      size={18}
                    />
                  </button>

                  {/* Dots */}

                  <div
                    className="person-profile-dots"
                    role="tablist"
                    aria-label="Person photos"
                  >
                    {photos.map(
                      (
                        path,
                        index
                      ) => (
                        <button
                          key={`${path}-${index}`}
                          type="button"
                          className={
                            index ===
                            photoIndex
                              ? "is-active"
                              : ""
                          }
                          onClick={() =>
                            setPhotoIndex(
                              index
                            )
                          }
                          aria-label={`Show photo ${
                            index + 1
                          }`}
                          aria-selected={
                            index ===
                            photoIndex
                          }
                        />
                      )
                    )}
                  </div>
                </>
              )}
            </div>
          </div>

          {/* =================================================
              INFORMATION
          ================================================= */}

          <div className="person-hero-info">

            {/* Kicker */}

            <div className="person-hero-kicker">

              <span className="person-role">
                <UserRound
                  size={12}
                />

                {knownFor}
              </span>

              {person.popularity !=
                null && (
                <span className="person-popularity">
                  <Star
                    size={13}
                  />

                  {Number(
                    person.popularity
                  ).toFixed(1)}
                </span>
              )}
            </div>

            {/* Name + Actions */}

            <div className="person-hero-title-row">

              <h1 className="person-hero-title">
                {person.name}
              </h1>

              <div className="person-hero-actions">

                {/* Favorite */}

                <button
                  type="button"
                  className={`person-favorite-button ${
                    isFavorite
                      ? "is-saved"
                      : ""
                  }`}
                  onClick={
                    toggleFavorite
                  }
                  aria-pressed={
                    isFavorite
                  }
                  aria-label={
                    isFavorite
                      ? "Remove from favorites"
                      : "Add to favorites"
                  }
                >
                  <Heart
                    size={16}
                    fill={
                      isFavorite
                        ? "currentColor"
                        : "none"
                    }
                  />

                  <span>
                    {isFavorite
                      ? "Favorited"
                      : "Favorite"}
                  </span>
                </button>

                {/* Share */}

                <button
                  type="button"
                  className="person-share-button"
                  onClick={
                    sharePerson
                  }
                >
                  {linkCopied ? (
                    <>
                      <Check
                        size={16}
                      />

                      <span>
                        Link Copied
                      </span>
                    </>
                  ) : (
                    <>
                      <Share2
                        size={16}
                      />

                      <span>
                        Share
                      </span>
                    </>
                  )}
                </button>

              </div>
            </div>

            {/* Aliases */}

            {aliases.length >
              0 && (
              <div className="person-aliases">

                <p className="person-aliases-label">
                  Also known as
                </p>

                <div className="person-alias-list">
                  {aliases.map(
                    (alias) => (
                      <span
                        key={alias}
                        className="person-alias"
                      >
                        {alias}
                      </span>
                    )
                  )}
                </div>
              </div>
            )}

            {/* Stats */}

            <div className="person-hero-stats">

              {person.birthday && (
                <HeroStat
                  icon={
                    <CalendarDays
                      size={16}
                    />
                  }
                  label="Born"
                  value={formatDate(
                    person.birthday
                  )}
                />
              )}

              {age !== null &&
                !person.deathday && (
                  <HeroStat
                    icon={
                      <UserRound
                        size={16}
                      />
                    }
                    label="Age"
                    value={`${age} years`}
                  />
                )}

              {person.deathday && (
                <HeroStat
                  icon={
                    <CalendarDays
                      size={16}
                    />
                  }
                  label="Died"
                  value={formatDate(
                    person.deathday
                  )}
                />
              )}

              {person.place_of_birth && (
                <HeroStat
                  icon={
                    <MapPin
                      size={16}
                    />
                  }
                  label="Birthplace"
                  value={
                    person.place_of_birth
                  }
                  wide
                />
              )}

              {gender && (
                <HeroStat
                  icon={
                    <UserRound
                      size={16}
                    />
                  }
                  label="Gender"
                  value={gender}
                />
              )}

              {person.known_for_department && (
                <HeroStat
                  icon={
                    <Film size={16} />
                  }
                  label="Known for"
                  value={
                    person.known_for_department
                  }
                />
              )}

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   HERO STAT
========================================================= */

function HeroStat({
  icon,
  label,
  value,
  wide = false,
}) {
  if (!value) {
    return null;
  }

  return (
    <div
      className={`
        person-hero-stat
        ${
          wide
            ? "person-hero-stat-wide"
            : ""
        }
      `}
    >
      <div className="person-hero-stat-icon">
        {icon}
      </div>

      <div className="person-hero-stat-content">

        <span className="person-hero-stat-label">
          {label}
        </span>

        <strong
          className="person-hero-stat-value"
          title={String(value)}
        >
          {value}
        </strong>

      </div>
    </div>
  );
}