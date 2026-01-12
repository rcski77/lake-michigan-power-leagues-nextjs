import Image from "next/image";
import { unstable_cache } from "next/cache";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import PageHeader from "./components/PageHeader";
import WaveDivider from "./components/WaveDivider";
import Card from "./components/Card";
import FacebookFeed from "./components/FacebookFeed";
import { client } from "../src/sanity/client";

// Revalidate page every 5 minutes (ISR - Incremental Static Regeneration)
export const revalidate = 300;

// Define the Power League data type matching the Sanity schema
interface AgeGroup {
  ageGroup: string;
  notes?: string;
}

interface PowerLeague {
  title: string;
  shortName: string;
  seasonYear?: number;
  startDate?: string;
  endDate?: string;
  location?: string;
  ageGroups?: AgeGroup[];
  entryFee?: number;
  entryDeadline?: string;
  rules?: string;
  registrationLink?: string;
  hotelInfoLink?: string;
  scheduleLink?: string;
}

// MOTD / Announcement type
interface Motd {
  message: string;
  active: boolean;
}

// Fetch Power League data from Sanity (cached for 1 hour)
const getPowerLeagueData = unstable_cache(
  async (): Promise<PowerLeague[]> => {
    try {
      const query = `*[_type == "powerLeague"] | order(startDate desc){
        title,
        shortName,
        seasonYear,
        startDate,
        endDate,
        location,
        ageGroups[]{
          ageGroup,
          notes
        },
        entryFee,
        entryDeadline,
        rules,
        registrationLink,
        hotelInfoLink,
        scheduleLink
      }`;

      const data = await client.fetch(query);
      return data || [];
    } catch (error) {
      console.error("Error fetching Power League data:", error);
      return [];
    }
  },
  ["powerLeagueData"],
  { revalidate: 3600 }
);

// Fetch active MOTD/Announcement from Sanity matching the `message` schema (cached for 5 minutes)
const getMotd = unstable_cache(
  async (): Promise<Motd | null> => {
    try {
      const query = `*[
        _type == "message" &&
        active == true &&
        (!defined(displayStart) || displayStart <= now()) &&
        (!defined(displayEnd) || displayEnd >= now())
      ] | order(coalesce(displayStart, _updatedAt) desc)[0]{
        "message": content,
        active
      }`;
      const data = await client.fetch(query);
      return data || null;
    } catch (error) {
      console.error("Error fetching MOTD:", error);
      return null;
    }
  },
  ["motd"],
  { revalidate: 300 }
);

// Format date for display
function formatDate(dateString: string | undefined): string {
  if (!dateString) return "TBA";
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

// Format date range for display
function formatDateRange(
  startDate: string | undefined,
  endDate: string | undefined
): string {
  if (!startDate || !endDate) return "";

  const start = new Date(startDate);
  const end = new Date(endDate);

  const startMonth = start.toLocaleDateString("en-US", { month: "long" });
  const startDay = start.getDate();
  const endMonth = end.toLocaleDateString("en-US", { month: "long" });
  const endDay = end.getDate();
  const year = end.getFullYear();

  // If same month
  if (startMonth === endMonth) {
    return `${startMonth} ${startDay} & ${endDay}, ${year}`;
  }

  // If different months
  return `${startMonth} ${startDay} - ${endMonth} ${endDay}, ${year}`;
}

export default async function Home() {
  const [leagues, motd] = await Promise.all([getPowerLeagueData(), getMotd()]);

  if (!leagues || leagues.length === 0) {
    return (
      <div className="min-h-screen bg-linear-to-b from-gray-50 to-white">
        <Navbar />
        <PageHeader
          title="Lake Michigan Power Leagues"
          subtitle="Loading tournament information..."
        />
        {motd?.active && motd?.message && (
          <section className="bg-white py-6">
            <div className="max-w-7xl mx-auto px-4">
              <div className="border-2 border-orange-300 bg-orange-50 rounded-xl p-4 md:p-5 flex items-start gap-3">
                <svg
                  className="w-6 h-6 text-orange-700 mt-0.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"
                  />
                </svg>
                <div>
                  <p className="text-orange-900 font-semibold mb-1">
                    Announcement
                  </p>
                  <p className="text-gray-900">{motd.message}</p>
                </div>
              </div>
            </div>
          </section>
        )}
        <main className="max-w-7xl mx-auto px-4 py-8">
          <div className="text-center text-gray-600">
            Tournament information is currently unavailable. Please check back
            later.
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-b from-gray-50 to-white">
      <Navbar />
      <PageHeader
        title="Lake Michigan Power Leagues"
        subtitle="West Michigan & NW Indiana"
      />

      {/* MOTD / Announcement (visible only when active) */}
      {motd?.active && motd?.message && (
        <section className="bg-white py-6">
          <div className="max-w-7xl mx-auto px-4">
            <div className="border-2 border-orange-300 bg-orange-50 rounded-xl p-4 md:p-5 flex items-start gap-3">
              <svg
                className="w-6 h-6 text-orange-700 mt-0.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"
                />
              </svg>
              <div>
                <p className="text-orange-900 font-semibold mb-1">Announcement</p>
                <p className="text-gray-900">{motd.message}</p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Navigation Cards Section - Light Blue Background */}
      <section className="bg-blue-50 py-12">
        <div className="max-w-7xl mx-auto px-4">
          {/* Navigation Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Two small schedule cards stacked within a single grid cell */}
            {(() => {
              const scheduleLeagues = leagues.filter((l) => !!l.scheduleLink);
              const chunks: (typeof scheduleLeagues)[] = [];
              for (let i = 0; i < scheduleLeagues.length; i += 2) {
                chunks.push(scheduleLeagues.slice(i, i + 2));
              }
              return chunks.map((chunk, ci) => (
                <div
                  key={`schedule-group-${ci}`}
                  className="flex flex-col gap-4"
                >
                  {chunk.map((l, idx) => (
                    <Card
                      key={`schedule-${ci}-${idx}`}
                      title={`${l.shortName} Schedule`}
                      link={l.scheduleLink as string}
                      size="small"
                    />
                  ))}
                </div>
              ));
            })()}

            {leagues[0]?.hotelInfoLink && (
              <Card title="Hotel Information" link={leagues[0].hotelInfoLink} />
            )}
            <Card title="Information/Rules" link="/information" />
            <Card title="Locations" link="/locations" />
          </div>
        </div>
      </section>

      <WaveDivider />

      {/* Tournament Details Section - White Background with Facebook Sidebar */}
      <section className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-[2fr_1fr] gap-8 items-start">
            <div className="space-y-8">
              {/* Tournament Details - Loop through all leagues */}
              {leagues.map((leagueData, index) => (
                <div
                  key={index}
                  className="bg-white border-2 border-orange-200 rounded-xl shadow-xl p-8 md:p-12"
                >
                  <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-orange-900">
                    {leagueData.title}
                  </h2>
                  {(leagueData.startDate || leagueData.endDate) && (
                    <p className="text-2xl font-semibold text-center text-orange-700 mb-6">
                      {formatDateRange(
                        leagueData.startDate,
                        leagueData.endDate
                      )}
                    </p>
                  )}
                  <p className="text-center text-lg mb-8 text-gray-700">
                    {leagueData.location || "Grand Rapids, MI"}
                  </p>

                  <div className="max-w-3xl mx-auto space-y-3 mb-10">
                    {leagueData.entryFee && (
                      <div className="grid grid-cols-1 md:grid-cols-2 border-2 border-orange-300 rounded-lg overflow-hidden">
                        <div className="p-4 bg-orange-50 font-bold border-r-2 border-orange-300 text-orange-900">
                          ENTRY FEE:
                        </div>
                        <div className="p-4 bg-white text-black">
                          ${leagueData.entryFee.toFixed(2)}
                        </div>
                      </div>
                    )}
                    {leagueData.entryDeadline && (
                      <div className="grid grid-cols-1 md:grid-cols-2 border-2 border-orange-300 rounded-lg overflow-hidden">
                        <div className="p-4 bg-orange-50 font-bold border-r-2 border-orange-300 text-orange-900">
                          ENTRY DEADLINE:
                        </div>
                        <div className="p-4 bg-white text-black">
                          {formatDate(leagueData.entryDeadline)}
                        </div>
                      </div>
                    )}
                    {leagueData.registrationLink && (
                      <div className="grid grid-cols-1 md:grid-cols-2 border-2 border-orange-300 rounded-lg overflow-hidden">
                        <div className="p-4 bg-orange-50 font-bold border-r-2 border-orange-300 text-orange-900">
                          REGISTRATION:
                        </div>
                        <div className="p-4 bg-white text-black font-bold">
                          <a
                            href={leagueData.registrationLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-orange-600 hover:text-orange-800 hover:underline transition-colors">
                            Register Here
                          </a>
                        </div>
                      </div>
                    )}
                    {leagueData.rules && (
                      <div className="grid grid-cols-1 md:grid-cols-2 border-2 border-orange-300 rounded-lg overflow-hidden">
                        <div className="p-4 bg-orange-50 font-bold border-r-2 border-orange-300 text-orange-900">
                          RULES:
                        </div>
                        <div className="p-4 bg-white text-black">
                          {leagueData.rules}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Age Groups Cards */}
                  {leagueData.ageGroups && leagueData.ageGroups.length > 0 && (
                    <div className="mb-10">
                      <h3 className="text-2xl font-bold text-center mb-6 text-orange-900">
                        Age Groups
                      </h3>
                      <div className="flex flex-wrap justify-center gap-4 max-w-5xl mx-auto">
                        {leagueData.ageGroups.map((group, index) => (
                          <div
                            key={index}
                            className="bg-linear-to-br from-orange-50 to-white border-2 border-orange-300 rounded-lg p-5 shadow-md hover:shadow-lg transition-shadow"
                          >
                            <h4 className="text-xl font-bold text-orange-900 mb-2">
                              {group.ageGroup}
                            </h4>
                            {group.notes && (
                              <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-line">
                                {group.notes}
                              </p>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <aside className="p-0 md:p-0 lg:sticky top-24 space-y-3">
              <FacebookFeed />
            </aside>
          </div>
        </div>
      </section>

      {/* Contact Section - Light Blue Background */}
      <section className="bg-blue-50 py-12">
        <div className="max-w-7xl mx-auto px-4">
          {/* Contact Information - Displayed once after all leagues */}
          <div className="max-w-4xl mx-auto space-y-4 text-base leading-relaxed text-gray-700 bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-orange-900 mb-4">
              Contact Information
            </h2>
            <div className="space-y-3">
              <p>
                <span className="font-semibold text-orange-900">Email:</span>{" "}
                <a
                  href="mailto:admin@lkmichpl.org"
                  className="text-orange-600 hover:text-orange-800 hover:underline transition-colors"
                >
                  admin@lkmichpl.org
                </a>
              </p>
              <p>
                <span className="font-semibold text-orange-900">Phone:</span> (616)
                259-5306
              </p>
              <p className="pt-2">
                Please contact Adam Rykse for more information about the Lake
                Michigan Power Leagues.
              </p>
            </div>
          </div>

          {/* AAU Logos */}
          <div className="flex flex-col md:flex-row justify-center items-center gap-8 mt-10">
            <div className="relative w-80 h-40">
              <Image
                src="/aau_logo.png"
                alt="AAU Logo"
                fill
                className="object-contain"
              />
            </div>
            <div className="relative w-80 h-40">
              <Image
                src="/LOVBIndigo.svg"
                alt="LOVB Logo"
                fill
                className="object-contain"
              />
            </div>
            <div className="relative w-80 h-40">
              <Image
                src="/aauvball_logo.png"
                alt="AAU Volleyball Logo"
                fill
                className="object-contain mix-blend-multiply"
              />
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
