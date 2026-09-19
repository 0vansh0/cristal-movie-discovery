import { useNavigate, useParams } from "react-router-dom";

import useCollection from "../hooks/useCollection";

import CollectionHero from "../components/Collection/CollectionHero";
import CollectionStats from "../components/Collection/CollectionStats";
import CollectionTimeline from "../components/Collection/CollectionTimeline";
import CollectionGrid from "../components/Collection/CollectionGrid";
import CollectionCarousel from "../components/Collection/CollectionCarousel";
import CollectionOverview from "../components/Collection/CollectionOverview";
import CollectionGallery from "../components/Collection/CollectionGallery";
import CollectionRecommendations from "../components/Collection/CollectionRecommendations";
import CollectionSkeleton from "../components/Collection/CollectionSkeleton";

export default function CollectionPage() {

    const { id } = useParams();

    const navigate = useNavigate();

    const {

        collection,

        movies,

        gallery,

        stats,

        loading,

        error,

    } = useCollection(id);

    if (loading) {
        return (
            <div className="container mx-auto py-10">
                <CollectionSkeleton />
            </div>
        );
    }

    if (error) {
        return (

            <div
                className="
                    flex
                    min-h-screen
                    items-center
                    justify-center
                "
            >

                <div className="text-center">

                    <h1 className="text-5xl font-black">

                        Failed to load collection

                    </h1>

                    <p className="mt-4 text-zinc-400">

                        Something went wrong while loading this collection.

                    </p>

                </div>

            </div>

        );
    }

    return (

        <main className="pb-32">

            {/* Hero */}

            <CollectionHero

                collection={collection}

                movies={movies}

            />

            <div
                className="
                    mx-auto
                    mt-12
                    max-w-7xl
                    space-y-20
                    px-6
                "
            >

                {/* Stats */}

                <CollectionStats

                    movies={movies}

                    stats={stats}

                />

                {/* Overview */}

                <CollectionOverview

                    collection={collection}

                />

                {/* Featured */}

                <CollectionCarousel

                    movies={movies}

                    onMovieClick={(id) =>
                        navigate(`/movie/${id}`)
                    }

                />

                {/* Timeline */}

                <CollectionTimeline

                    movies={movies}

                    onMovieClick={(id) =>
                        navigate(`/movie/${id}`)
                    }

                />

                {/* Grid */}

                <CollectionGrid

                    movies={movies}

                    onMovieClick={(id) =>
                        navigate(`/movie/${id}`)
                    }

                    onFavorite={(movie) => {

                        console.log("Favorite", movie);

                    }}

                    onWatchlist={(movie) => {

                        console.log("Watchlist", movie);

                    }}

                />

                {/* Gallery */}

                <CollectionGallery

                    images={gallery}

                />

                {/* Recommendations */}

                <CollectionRecommendations

                    collections={[]}

                    onCollectionClick={(id) =>
                        navigate(`/collection/${id}`)
                    }

                />

            </div>

        </main>

    );

}