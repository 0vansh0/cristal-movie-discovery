import { useNavigate, useParams } from "react-router-dom";
import { AlertCircle } from "lucide-react";

import useActor from "../hooks/useActor";

import LoadingSkeleton from "../components/Actor/LoadingSkeleton";
import ActorHero from "../components/Actor/ActorHero";
import Biography from "../components/Actor/Biography";
import KnownForSection from "../components/Actor/KnownForSection";
import MovieCredits from "../components/Actor/MovieCredits";
import TVCredits from "../components/Actor/TVCredits";
import ImagesGallery from "../components/Actor/ImagesGallery";
import AwardsTimeline from "../components/Actor/AwardsTimeline";
import SocialLinks from "../components/Actor/SocialLinks";
import PersonalInfo from "../components/Actor/PersonalInfo";
import ActorStats from "../components/Actor/ActorStats";
import ActorFacts from "../components/Actor/ActorFacts";
import SimilarActors from "../components/Actor/SimilarActors";
import ActorFloatingActions from "../components/Actor/ActorFloatingActions";

export default function ActorPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    loading,
    error,
    actor,
    movieCredits,
    tvCredits,
    images,
    externalIds,
    similarActors,
  } = useActor(id);

  if (loading) {
    return (
      <main className="container mx-auto px-6 py-8">
        <LoadingSkeleton />
      </main>
    );
  }

  if (error || !actor) {
    return (
      <main className="flex min-h-screen items-center justify-center px-6">

        <div
          className="
            max-w-lg
            rounded-[32px]
            border
            border-red-500/20
            bg-red-500/10
            p-10
            text-center
          "
        >

          <AlertCircle
            size={70}
            className="mx-auto text-red-400"
          />

          <h2 className="mt-6 text-3xl font-black">
            Unable to Load Actor
          </h2>

          <p className="mt-3 text-zinc-400">
            {error}
          </p>

        </div>

      </main>
    );
  }

  return (
    <main
      className="
        relative
        pb-32
      "
    >

      {/* Hero */}

      <ActorHero actor={actor} />

      {/* Content */}

      <div
        className="
          container
          mx-auto
          mt-12
          space-y-24
          px-6
        "
      >

        <ActorStats
          actor={actor}
          movieCredits={movieCredits}
          tvCredits={tvCredits}
        />

        <Biography actor={actor} />

        <KnownForSection
          movies={movieCredits.slice(0, 12)}
          onMovieClick={(movieId) =>
            navigate(`/movie/${movieId}`)
          }
        />

        <ActorFacts
          actor={actor}
          movieCredits={movieCredits}
          tvCredits={tvCredits}
        />

        <MovieCredits
          credits={movieCredits}
          onMovieClick={(movieId) =>
            navigate(`/movie/${movieId}`)
          }
        />

        <TVCredits
          credits={tvCredits}
          onTVClick={(tvId) =>
            navigate(`/tv/${tvId}`)
          }
        />

        <ImagesGallery
          images={images}
        />

        <PersonalInfo
          actor={actor}
        />

        <SocialLinks
          homepage={actor.homepage}
          externalIds={externalIds}
        />

        {/* Placeholder until awards API */}
        <AwardsTimeline awards={[]} />

        {/* Similar Actors */}
        <SimilarActors
          actors={similarActors}
          onActorClick={(actorId) =>
            navigate(`/actor/${actorId}`)
          }
        />

      </div>

      <ActorFloatingActions actor={actor} />

    </main>
  );
}