import Image from "next/image";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import PageHeader from "./components/PageHeader";
import WaveDivider from "./components/WaveDivider";
import { client } from "../src/sanity/client";

// Define the Power League data type matching the Sanity schema
interface AgeGroup {
  ageGroup: string;
  notes?: string;
}

interface PowerLeague {
  title: string;
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
}

// Fetch Power League data from Sanity
async function getPowerLeagueData(): Promise<PowerLeague[]> {
  try {
    const query = `*[_type == "powerLeague"] | order(startDate desc){
      title,
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
      hotelInfoLink
    }`;

    const data = await client.fetch(query);
    return data || [];
  } catch (error) {
    console.error("Error fetching Power League data:", error);
    return [];
  }
}

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
  const leagues = await getPowerLeagueData();

  if (!leagues || leagues.length === 0) {
    return (
      <div className="min-h-screen bg-linear-to-b from-gray-50 to-white">
        <Navbar />
        <PageHeader
          title="Lake Michigan Power Leagues"
          subtitle="Loading tournament information..."
        />
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

      {/* Navigation Cards Section - Light Blue Background */}
      <section className="bg-blue-50 py-12">
        <div className="max-w-7xl mx-auto px-4">
          {/* Navigation Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card title="Schedule" link="/information#schedule" />
            {leagues[0]?.hotelInfoLink && (
              <Card title="Hotel Information" link={leagues[0].hotelInfoLink} />
            )}
            <Card title="Information/Rules" link="/information" />
            <Card title="Locations" link="/locations" />
          </div>
        </div>
      </section>

      <WaveDivider />

      {/* Tournament Details Section - White Background */}
      <section className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          {/* Tournament Details - Loop through all leagues */}
          {leagues.map((leagueData, index) => (
            <div key={index} className="grid grid-cols-1 gap-8 mb-8">
              <div>
                <div className="bg-white border-2 border-red-200 rounded-xl shadow-xl p-8 md:p-12 mb-12">
                  <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-red-900">
                    {leagueData.title}
                  </h2>
                  {(leagueData.startDate || leagueData.endDate) && (
                    <p className="text-2xl font-semibold text-center text-red-700 mb-6">
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
                      <div className="grid grid-cols-1 md:grid-cols-2 border-2 border-red-300 rounded-lg overflow-hidden">
                        <div className="p-4 bg-red-50 font-bold border-r-2 border-red-300 text-red-900">
                          ENTRY FEE:
                        </div>
                        <div className="p-4 bg-white text-black">
                          ${leagueData.entryFee.toFixed(2)}
                        </div>
                      </div>
                    )}
                    {leagueData.entryDeadline && (
                      <div className="grid grid-cols-1 md:grid-cols-2 border-2 border-red-300 rounded-lg overflow-hidden">
                        <div className="p-4 bg-red-50 font-bold border-r-2 border-red-300 text-red-900">
                          ENTRY DEADLINE:
                        </div>
                        <div className="p-4 bg-white text-black">
                          {formatDate(leagueData.entryDeadline)}
                        </div>
                      </div>
                    )}
                    {leagueData.registrationLink && (
                      <div className="grid grid-cols-1 md:grid-cols-2 border-2 border-red-300 rounded-lg overflow-hidden">
                        <div className="p-4 bg-red-50 font-bold border-r-2 border-red-300 text-red-900">
                          REGISTRATION:
                        </div>
                        <div className="p-4 bg-white text-black font-bold">
                          <a
                            href={leagueData.registrationLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-red-600 hover:text-red-800 hover:underline transition-colors"
                          >
                            Register Here
                          </a>
                        </div>
                      </div>
                    )}
                    {leagueData.rules && (
                      <div className="grid grid-cols-1 md:grid-cols-2 border-2 border-red-300 rounded-lg overflow-hidden">
                        <div className="p-4 bg-red-50 font-bold border-r-2 border-red-300 text-red-900">
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
                      <h3 className="text-2xl font-bold text-center mb-6 text-red-900">
                        Age Groups
                      </h3>
                      <div className="flex flex-wrap justify-center gap-4 max-w-5xl mx-auto">
                        {leagueData.ageGroups.map((group, index) => (
                          <div
                            key={index}
                            className="bg-linear-to-br from-red-50 to-white border-2 border-red-300 rounded-lg p-5 shadow-md hover:shadow-lg transition-shadow"
                          >
                            <h4 className="text-xl font-bold text-red-900 mb-2">
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
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Section - Light Blue Background */}
      <section className="bg-blue-50 py-12">
        <div className="max-w-7xl mx-auto px-4">
          {/* Contact Information - Displayed once after all leagues */}
          <div className="max-w-4xl mx-auto space-y-4 text-base leading-relaxed text-gray-700 bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-red-900 mb-4">
              Contact Information
            </h2>
            <div className="space-y-3">
              <p>
                <span className="font-semibold text-red-900">Email:</span>{" "}
                <a
                  href="mailto:admin@lkmichpl.org"
                  className="text-red-600 hover:text-red-800 hover:underline transition-colors"
                >
                  admin@lkmichpl.org
                </a>
              </p>
              <p>
                <span className="font-semibold text-red-900">Phone:</span> (616)
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
                src="/aauvball_logo.png"
                alt="AAU Volleyball Logo"
                fill
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

function Card({ title, link }: { title: string; link: string }) {
  return (
    <a
      href={link}
      className="relative block bg-white border border-gray-200 rounded-xl p-8 shadow-md hover:shadow-2xl hover:scale-105 transition-all duration-300 text-center group overflow-hidden"
    >
      <div className="absolute inset-0 bg-linear-to-br from-red-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      <div className="relative z-10">
        <div className="w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center group-hover:bg-red-600 transition-colors duration-300">
          <svg
            className="w-8 h-8 text-red-600 group-hover:text-white transition-colors duration-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </div>
        <h2 className="text-xl font-bold text-gray-900 group-hover:text-red-700 mb-3 transition-colors duration-300">
          {title}
        </h2>
        <span className="text-red-600 font-semibold group-hover:underline">
          Read more »
        </span>
      </div>
    </a>
  );
}
