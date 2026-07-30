const gameSystems = [
  "Warhammer 40,000",
  "Age of Sigmar",
  "Kill Team",
  "Dungeons & Dragons",
  "Other tabletop game",
];

export default function MatchmakingPage() {
  return (
    <main className="matchmakingPage">
      <nav className="navigation matchmakingNavigation" aria-label="Main navigation">
        <a className="brand" href="/">ELVENSFORGE</a>
        <div className="navigationLinks">
          <a href="/">Home</a>
          <a aria-current="page" href="/matchmaking/">Matchmaking</a>
        </div>
        <a className="navigationButton" href="#find-a-game">Find a game</a>
      </nav>

      <section className="matchmakingHero">
        <div className="matchmakingIntro">
          <p className="eyebrow">COMMUNITY · PLAY · CONNECT</p>
          <h1>Find your next tabletop match.</h1>
          <p>
            A simple first version of ElvensForge Matchmaking. Choose what you
            play, where you are, and what kind of game you are looking for.
          </p>
        </div>

        <div className="matchmakingPanel" id="find-a-game">
          <div className="panelHeader">
            <div>
              <p className="eyebrow">MATCH REQUEST</p>
              <h2>Start looking</h2>
            </div>
            <span className="prototypeBadge">Prototype</span>
          </div>

          <form className="matchmakingForm">
            <label>
              Game system
              <select defaultValue="">
                <option value="" disabled>Select a game</option>
                {gameSystems.map((game) => (
                  <option key={game} value={game}>{game}</option>
                ))}
              </select>
            </label>

            <div className="formRow">
              <label>
                City or area
                <input name="location" placeholder="e.g. Tilburg" type="text" />
              </label>
              <label>
                Preferred date
                <input name="date" type="date" />
              </label>
            </div>

            <label>
              What are you looking for?
              <textarea
                name="details"
                placeholder="Casual game, 2,000 points, beginner friendly..."
                rows={5}
              />
            </label>

            <button className="primaryButton matchmakingSubmit" type="button">
              Search for players
            </button>
            <p className="formNote">
              Search and profiles will be connected later. For now, this page
              is ready for the next authentication step.
            </p>
          </form>
        </div>
      </section>

      <section className="matchmakingSteps">
        <article><span>01</span><h3>Create your request</h3><p>Tell the community what, where and when you want to play.</p></article>
        <article><span>02</span><h3>Find compatible players</h3><p>Later, filters and player profiles will help refine the search.</p></article>
        <article><span>03</span><h3>Arrange the match</h3><p>Connect, agree on the details and bring your armies to the table.</p></article>
      </section>
    </main>
  );
}
