'use client';

import { useState } from 'react';
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import PageHeader from "@/app/components/PageHeader";
import WaveDivider from "@/app/components/WaveDivider";
import { previousWinners } from "@/app/data/previousWinners";

type Section = 'rulebook' | 'aau' | 'facility-rules' | 'inclement-weather' | 'previous-winners';

export default function InformationPage() {
  const [activeSection, setActiveSection] = useState<Section>('rulebook');

  const navigationItems = [
    { id: 'rulebook' as Section, label: 'RULEBOOK' },
    { id: 'aau' as Section, label: 'AAU AGE DEFINITIONS' },
    { id: 'facility-rules' as Section, label: 'FACILITY RULES' },
    { id: 'inclement-weather' as Section, label: 'INCLEMENT WEATHER POLICY' },
    { id: 'previous-winners' as Section, label: 'PREVIOUS WINNERS' },
  ];

  return (
    <div className="min-h-screen bg-linear-to-b from-gray-50 to-white">
      <Navbar />
      <PageHeader 
        title="Rules and Info"
        subtitle="League info, rules, and policies"
      />
      <WaveDivider />

      <main className="max-w-6xl mx-auto px-4 py-10">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Navigation Sidebar */}
          <nav className="md:w-48 shrink-0">
            <div className="bg-white border-2 border-orange-200 rounded-xl shadow-lg overflow-hidden">
              {navigationItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={`w-full px-4 py-3 text-left font-semibold text-sm transition-colors border-b border-orange-100 last:border-b-0 ${
                    activeSection === item.id
                      ? 'bg-orange-600 text-white'
                      : 'bg-white text-gray-600 hover:bg-orange-50'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </nav>

          {/* Content Area */}
          <div className="flex-1 space-y-6">
            {/* Rulebook Section */}
            {activeSection === 'rulebook' && (
              <div className="space-y-6">
                {/* Match and Forfeit Times */}
              <section className="bg-white border-2 border-orange-200 rounded-xl shadow-lg p-8">
                  <h2 className="text-3xl font-bold text-orange-900 mb-4">Match and Forfeit Times</h2>
                  <div className="space-y-3 text-gray-700 leading-relaxed">
                    <p>
                      Matches will begin 10 minutes from the conclusion of the preceding match. 
                      Warm-ups may not begin more than 25 minutes ahead of the scheduled match time unless 
                      agreed upon by both teams. Wave start times will not be moved up. Subsequent 
                      rounds and bracket play matches will be moved up whenever time allows.
                    </p>
                    <p>
                      At the start time, if teams are not ready to play, the opposing team will be awarded one 
                      point per minute. After ten minutes, the first game will then be forfeited. The 
                      second game and match will also be forfeited after an additional 10 minutes.
                    </p>
                  </div>
                </section>

                {/* Format */}
                <section className="bg-white border-2 border-orange-200 rounded-xl shadow-lg p-8">
                  <h2 className="text-3xl font-bold text-orange-900 mb-4">Format</h2>
                  <div className="space-y-4 text-gray-700 leading-relaxed">
                    <div>
                      <h3 className="font-bold text-lg text-orange-800 mb-2">1. Match Play</h3>
                      <p>
                        Best 2 out of 3 games. First 2 games to 25; deciding game if necessary to 15. No cap on any game. 
                        A few divisions may utilize 3 out of 5 matches or 3 sets to 25.
                      </p>
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-orange-800 mb-2">2. Warm-ups (2-4-4)</h3>
                      <p>
                        2 minutes shared ball handling, 4 minutes each team hitting and serving. Absolutely no ball handling by 
                        the team that is off. Off teams are required to help shag for the team that is hitting. Teams refusing to do 
                        this will be given a red card prior to the start of the match.
                      </p>
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-orange-800 mb-2">3. Coin Flip</h3>
                      <p>
                        Coin flip prior to match will determine side and serve.
                      </p>
                    </div>
                  </div>
                </section>

                {/* Work Team Assignments */}
                <section className="bg-white border-2 border-orange-200 rounded-xl shadow-lg p-8">
                  <h2 className="text-3xl font-bold text-orange-900 mb-4">Work Team Assignments</h2>
                  <div className="space-y-3 text-gray-700 leading-relaxed">
                    <p>
                      <span className="font-bold text-orange-800">1. Official Coverage:</span> First official will be provided for all matches. Each team is responsible to 
                      provide: 1 down official, 2 lines people, 1 official scorekeeper, a libero tracker 
                      and 1 person for flip score. You are responsible for your own whistles.
                    </p>
                    <p>
                      <span className="font-bold text-orange-800">2. Timeliness:</span> If you are late for your officiating assignment, the same penalties apply as to 
                      match and forfeit times. All penalties will be carried over to the following day 
                      if necessary. Please check closely to be sure you know the schedule. If you are 
                      uncertain please ask the tournament director at your site. On time means the 
                      start of warmups, not match start time.
                    </p>
                    <p>
                      <span className="font-bold text-orange-800">3. Forfeit Penalties:</span> Any team that intentionally skips their work assignment or intentionally 
                      forfeits a match may be subject to more severe penalties.
                    </p>
                    <p>
                      <span className="font-bold text-orange-800">4. Supervision and Conduct:</span> It is required that a coach or other adult team representative remains in the 
                      game area during team officiating assignments. No food or drink will be allowed on 
                      the work table.
                    </p>
                    <p>
                      <span className="font-bold text-red-800">5. Electronic Devices:</span> No cell phones or electronic devices allowed at the work table. If a player(s) 
                      is found to be using a cell phone while working at the table the official or 
                      tournament director may sanction that team up to a 10 point penalty which would be 
                      applied to that team&apos;s next match.
                    </p>
                  </div>
                </section>

                {/* Exceptions to AAU Rules */}
                <section className="bg-white border-2 border-orange-200 rounded-xl shadow-lg p-8">
                  <h2 className="text-3xl font-bold text-orange-900 mb-4">Exceptions to AAU Rules</h2>
                  <div className="space-y-4 text-gray-700 leading-relaxed">
                    <p className="font-bold text-orange-800">Playing with Less Than 6 Players</p>
                    <ul className="list-disc list-inside space-y-2">
                      <li>
                        <span className="font-bold">For 12 & under:</span> They will not need a ghost player. They will rotate their 5 
                        players with no penalty and loss of serve.
                      </li>
                      <li>
                        <span className="font-bold">For all other age divisions:</span> They will need to use the ghost player. When the 
                        ghost player is front row there will be only 2 front row players. When the ghost 
                        player serves it will be a side out and point to the opposing team.
                      </li>
                    </ul>
                  </div>
                </section>

                {/* 12 & Under Division Step In Rule */}
                <section className="bg-white border-2 border-orange-200 rounded-xl shadow-lg p-8">
                  <h2 className="text-3xl font-bold text-orange-900 mb-4">12 & Under Division Step In Rule</h2>
                  <p className="text-gray-700 leading-relaxed mb-4 italic">
                    This is a &quot;Spirit of the game rule&quot; and is intended to promote more rallies. It 
                    is not intended to give a serving advantage to any player. Coaches are strongly 
                    encouraged to emphasize to not use the step in rule with players that have the 
                    ability to serve from behind the end line.
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-gray-700 leading-relaxed">
                    <li>Players must be in front of the end line when the referee beckons for serve.</li>
                    <li>The step in line will be marked with a hash line that is 2 meters in from the end line. Player may not go over the step in line.</li>
                    <li>No jump serving using the step in line.</li>
                    <li>If a player scores 4 points in a row they must serve from behind the end line for the remainder of that term of service.</li>
                    <li>It is at the referees discretion to move a player back behind the end line if it appears that a team is misusing the step in rule to gain an advantage.</li>
                    <li><span className="font-bold">Note:</span> This is a power league rule only - not for tournaments.</li>
                  </ul>
                </section>
              </div>
            )}

            {/* AAU Age Definitions */}
            {activeSection === 'aau' && (
              <section className="bg-white border-2 border-orange-200 rounded-xl shadow-lg p-8">
                <h2 className="text-3xl font-bold text-orange-900 mb-4">AAU Age Definitions</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Visit the official AAU Volleyball website for complete age group definitions and eligibility requirements.
                </p>
                <a href="https://aauvolleyball.org/page.php?page_id=100142" target="_blank" rel="noopener noreferrer" className="inline-block px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors font-semibold">
                  View AAU Age Definitions
                </a>
              </section>
            )}

            {/* Facility Rules */}
            {activeSection === 'facility-rules' && (
              <section className="bg-white border-2 border-orange-200 rounded-xl shadow-lg p-8">
                <h2 className="text-3xl font-bold text-orange-900 mb-4">Facility Rules</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  These are the rules and policies that apply to all facility play. Teams must adhere to all facility-specific regulations.
                </p>
                <div className="space-y-4 text-gray-700">
                  <div>
                    <h3 className="font-bold text-orange-800 mb-2">General Conduct</h3>
                    <p>All participants must conduct themselves in a sportsmanlike manner at all times. Violation of conduct policies may result in ejection from the facility.</p>
                  </div>
                  <div>
                    <h3 className="font-bold text-orange-800 mb-2">Facility Care</h3>
                    <p>Teams are responsible for keeping their designated areas clean. Please dispose of trash properly and respect facility equipment. Keep food to a minimum and keep it in your bag. No team areas for food and no tables are provided.</p>
                  </div>
                  <div>
                    <h3 className="font-bold text-orange-800 mb-2">Membership Requirements</h3>
                    <p>All players and coaches must be registered AAU members to participate in the power league.</p>
                  </div>
                  <div>
                    <h3 className="font-bold text-orange-800 mb-2">Facility Hours</h3>
                    <p>Doors will open 1 hour prior to the first scheduled match. Dunes is on Central Time (1 hour behind Michigan).</p>
                  </div>
                  <div>
                    <h3 className="font-bold text-orange-800 mb-2">Equipment</h3>
                    <p>Volleyballs will be provided for warm-ups. Facility-owned equipment must be used and returned in the same condition. Teams are responsible for any damage caused by their members.</p>
                  </div>
                  <div>
                    <h3 className="font-bold text-orange-800 mb-2">Spectators</h3>
                    <ul className="list-disc list-inside space-y-2">
                      <li>Daily admission is $10 for adults, $5 for students and senior citizens.</li>
                      <li>Maximum $25 per family (two adults and their children only).</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-bold text-orange-800 mb-2">Facility List</h3>
                    <a href="/locations" className="inline-block px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors font-semibold">
                      Facility Locations and Info
                    </a>
                  </div>
                </div>
              </section>
            )}

            {/* Inclement Weather Policy */}
            {activeSection === 'inclement-weather' && (
              <section className="bg-white border-2 border-orange-200 rounded-xl shadow-lg p-8">
                <h2 className="text-3xl font-bold text-orange-900 mb-4">Inclement Weather Policy</h2>
                <div className="space-y-6 text-gray-700 leading-relaxed">
                  <div>
                    <h3 className="font-bold text-orange-800 mb-3">Communication Methods</h3>
                    <p className="mb-2">In the event that we would have to delay or cancel a power league event due to the weather, it would be communicated the following ways:</p>
                    <ol className="list-decimal list-inside space-y-2 ml-4">
                      <li>An email would be sent via AES to all club directors and coaches that have their contact information listed on their team roster.</li>
                      <li>Posted on the Lake Michigan Power League website – www.lkmichpl.org</li>
                      <li>Posted on the MJVBA Facebook page</li>
                    </ol>
                  </div>
                  
                  <div>
                    <h3 className="font-bold text-orange-800 mb-3">Regional Weather Considerations</h3>
                    <p>
                      Considering that bad weather and bad roads can be very regionalized in Michigan and Indiana, we rarely would cancel the entire power league unless there is a storm that causes dangerous driving conditions for just about everyone. Typically we would first leave it up to each location as to whether or not they can still safely hold the event and second it would be up to each team/club to decide if they want to travel.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-bold text-orange-800 mb-3">Decision Timeline</h3>
                    <p>
                      Please realize that when making these determinations, it is not easy trying to decide what is best for 100 or more teams. We would try to cancel or delay as soon as possible but sometimes that determination isn&apos;t made until a few hours before the start of the event.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-bold text-orange-800 mb-3">Make-Up Policy</h3>
                    <p>
                      If only a few teams are unable to make it to an event, there would not be a make-up date for those teams. If there is a large amount of teams that don&apos;t participate, then every effort would be made to reschedule the event.
                    </p>
                  </div>
                </div>
              </section>
            )}

            {/* Previous Winners */}
            {activeSection === 'previous-winners' && (
              <div className="space-y-6">
                <div className="bg-white border-2 border-orange-200 rounded-xl shadow-lg p-8">
                  <h2 className="text-3xl font-bold text-orange-900 mb-4">Previous Winners</h2>
                  <p className="text-gray-700 leading-relaxed mb-6">
                    Congratulations to all of our tournament champions from past years!
                  </p>
                </div>

                {previousWinners.map((yearData) => (
                  <div key={yearData.year} className="bg-white border-2 border-orange-200 rounded-xl shadow-lg p-8">
                    <h3 className="text-2xl font-bold text-orange-800 mb-4">{yearData.year}</h3>
                    <ul className="space-y-2">
                      {yearData.winners.map((winner, index) => (
                        <li key={index} className="text-gray-700">
                          <span className="font-semibold text-orange-700">{winner.division}:</span> {winner.team}
                          {winner.runnerUp && (
                            <span className="text-gray-600 italic"> (Runner-up: {winner.runnerUp})</span>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
