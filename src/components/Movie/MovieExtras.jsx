import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { FaChevronDown, FaFilm, FaImages, FaPlay, FaStar, FaTimes, FaUserFriends } from "react-icons/fa";
import "./MovieExtras.css";

const image = (path, size = "w780") => path ? `https://image.tmdb.org/t/p/${size}${path}` : "/placeholder.jpg";
const formatMoney = (value) => value ? new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(value) : "Not available";

function Section({ title, icon, children, action }) {
  return <motion.section className="movie-extra-section" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .15 }} transition={{ duration: .45 }}><div className="movie-extra-heading"><h2>{icon}{title}</h2>{action}</div>{children}</motion.section>;
}

export default function MovieExtras({ movie, credits, videos = [], similar = [], onPlay }) {
  const [selectedImage, setSelectedImage] = useState(null);
  const [openFaq, setOpenFaq] = useState(null);
  const [review, setReview] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const trailers = videos.filter((video) => video.site === "YouTube" && ["Trailer", "Teaser", "Clip"].includes(video.type)).slice(0, 6);
  const photos = (movie.images?.backdrops || []).slice(0, 8);
  const cast = (credits?.cast || []).slice(0, 10);
  const keywords = movie.keywords?.keywords || movie.keywords?.results || [];
  const reviews = movie.reviews?.results || [];
  const faqs = useMemo(() => [
    { q: `When was ${movie.title} released?`, a: movie.release_date ? new Date(movie.release_date).toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" }) : "The release date is not available yet." },
    { q: `How long is ${movie.title}?`, a: movie.runtime ? `${Math.floor(movie.runtime / 60)} hours ${movie.runtime % 60} minutes.` : "Runtime is not available yet." },
    { q: "Where can I watch it?", a: "Open the Where to Watch section above to see live streaming, rental, and purchase options in your region." },
  ], [movie]);
  const submitReview = (event) => { event.preventDefault(); if (review && reviewText.trim()) { setSubmitted(true); setReviewText(""); } };

  return <div className="movie-extras">
    {trailers.length > 0 && <Section title="Videos & trailers" icon={<FaPlay />}><div className="movie-video-grid">{trailers.map((video) => <button type="button" className="movie-video-card" key={video.id} onClick={() => onPlay?.(video.key)}><div className="movie-video-cover" style={{ backgroundImage: `url(https://img.youtube.com/vi/${video.key}/hqdefault.jpg)` }}><span><FaPlay /></span></div><strong>{video.name}</strong><small>{video.type} · YouTube</small></button>)}</div></Section>}

    {photos.length > 0 && <Section title="Photos" icon={<FaImages />} action={<span>{movie.images.backdrops.length} images</span>}><div className="movie-photo-grid">{photos.map((photo, index) => <button type="button" key={`${photo.file_path}-${index}`} onClick={() => setSelectedImage(photo.file_path)}><img src={image(photo.file_path)} alt={`${movie.title} still ${index + 1}`} loading="lazy" /></button>)}</div></Section>}

    {cast.length > 0 && <Section title="Top cast" icon={<FaUserFriends />} action={<Link to={`/movie/${movie.id}`}>View full cast</Link>}><div className="movie-cast-grid">{cast.map((person) => <Link className="movie-cast-person" to={`/person/${person.id}`} key={person.id}><img src={image(person.profile_path, "w185")} alt={person.name} loading="lazy" /><div><strong>{person.name}</strong><span>{person.character || "Cast"}</span></div></Link>)}</div></Section>}

    <Section title="User reviews" icon={<FaStar />} action={<span>{movie.vote_count?.toLocaleString() || 0} ratings</span>}><div className="movie-review-summary"><div><b>{movie.vote_average?.toFixed(1) || "–"}</b><span>out of 10</span></div><div className="rating-bars">{[72, 88, 96, 82, 53].map((width, index) => <i key={index} style={{ "--width": `${width}%` }} />)}</div><p>Ratings and reviews are powered by the community. Add your own below.</p></div><form className="movie-review-form" onSubmit={submitReview}><div className="movie-star-picker" aria-label="Your rating">{[1,2,3,4,5,6,7,8,9,10].map((score) => <button type="button" aria-label={`Rate ${score} out of 10`} className={score <= review ? "is-selected" : ""} key={score} onClick={() => setReview(score)}><FaStar /></button>)}</div><textarea value={reviewText} onChange={(event) => setReviewText(event.target.value)} placeholder="Share what you thought about this movie…" /><button type="submit" disabled={!review || !reviewText.trim()}>{submitted ? "Review saved" : "Post review"}</button></form>{reviews.slice(0, 2).map((item) => <article className="movie-review-card" key={item.id}><strong>{item.author}</strong><span>★ {item.author_details?.rating || "–"}/10</span><p>{item.content}</p></article>)}</Section>

    {similar.length > 0 && <Section title="More like this" icon={<FaFilm />}><div className="movie-extra-rail">{similar.slice(0, 10).map((title) => <Link to={`/movie/${title.id}`} key={title.id} className="movie-extra-title"><img src={image(title.poster_path, "w342")} alt={title.title} loading="lazy" /><strong>{title.title}</strong><span>★ {title.vote_average?.toFixed(1)}</span></Link>)}</div></Section>}

    <div className="movie-extra-columns"><Section title="About this movie" icon={<FaFilm />}><p className="movie-extra-overview">{movie.overview}</p>{keywords.length > 0 && <div className="movie-keywords">{keywords.slice(0, 12).map((keyword) => <span key={keyword.id}>{keyword.name}</span>)}</div>}<dl className="movie-detail-list"><dt>Release date</dt><dd>{movie.release_date || "Not available"}</dd><dt>Original language</dt><dd>{movie.original_language?.toUpperCase() || "Not available"}</dd><dt>Production</dt><dd>{movie.production_companies?.map((company) => company.name).join(", ") || "Not available"}</dd></dl></Section><Section title="Box office & specs" icon={<FaFilm />}><dl className="movie-detail-list"><dt>Budget</dt><dd>{formatMoney(movie.budget)}</dd><dt>Revenue</dt><dd>{formatMoney(movie.revenue)}</dd><dt>Runtime</dt><dd>{movie.runtime ? `${movie.runtime} minutes` : "Not available"}</dd><dt>Status</dt><dd>{movie.status || "Not available"}</dd></dl></Section></div>

    <Section title="Did you know?" icon={<FaFilm />}><div className="movie-faq-list">{faqs.map((faq, index) => <div key={faq.q} className={openFaq === index ? "is-open" : ""}><button type="button" onClick={() => setOpenFaq(openFaq === index ? null : index)}><span>{faq.q}</span><FaChevronDown /></button><AnimatePresence>{openFaq === index && <motion.p initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}>{faq.a}</motion.p>}</AnimatePresence></div>)}</div></Section>

    <Section title="Related news" icon={<FaFilm />}><div className="movie-news-grid">{["Cast and crew highlights", "Behind the scenes", "Production notes"].map((headline, index) => <article key={headline}><span>{String(index + 1).padStart(2, "0")}</span><h3>{headline} for {movie.title}</h3><p>Explore the latest title information, cast details, and audience conversation.</p></article>)}</div></Section>
    <AnimatePresence>{selectedImage && <motion.div className="movie-lightbox" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedImage(null)}><button type="button" aria-label="Close image" onClick={() => setSelectedImage(null)}><FaTimes /></button><img src={image(selectedImage, "original")} alt={`${movie.title} gallery`} onClick={(event) => event.stopPropagation()} /></motion.div>}</AnimatePresence>
  </div>;
}
