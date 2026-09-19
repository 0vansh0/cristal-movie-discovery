import "./WatchProviders.css";

const LOGO_BASE_URL = "https://image.tmdb.org/t/p/w185";

function ProviderSection({ title, providers }) {
  if (!providers?.length) return null;

  return (
    <div className="provider-section">
      <h3>{title}</h3>

      <div className="provider-grid">
        {providers.map((provider) => (
          <div
            key={provider.provider_id}
            className="provider-card"
          >
            <img
              src={`${LOGO_BASE_URL}${provider.logo_path}`}
              alt={provider.provider_name}
              loading="lazy"
            />

            <span>{provider.provider_name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function WatchProviders({

  providers,

  country = "IN"

}) {

  const region = providers?.results?.[country];

  if (!region) return null;

  return (

    <section className="watch-providers">

      <h2>

        Where to Watch

      </h2>

      <ProviderSection

        title="Stream"

        providers={region.flatrate}

      />

      <ProviderSection

        title="Rent"

        providers={region.rent}

      />

      <ProviderSection

        title="Buy"

        providers={region.buy}

      />

      {region.link && (

        <a

          href={region.link}

          target="_blank"

          rel="noreferrer"

          className="provider-link"

        >

          View All Providers →

        </a>

      )}

    </section>

  );

}