import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 text-black-2">
      {/* Header */}
      <header className="bg-white shadow-md py-4 px-8 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-purple-1">ComplaintTrack</h1>
        <nav className="space-x-6 text-purple-1">
          <Link href="/feature" className="hover:text-purple-2 font-medium">
            Features
          </Link>
          <Link href="/about" className="hover:text-purple-2 font-medium">
            About
          </Link>
          <Link href="/contact" className="hover:text-purple-2 font-medium">
            Contact
          </Link>
        </nav>
      </header>

      {/* Hero */}
      <section className="text-center py-24 px-4 bg-grey-3">
        <h2 className="text-4xl font-extrabold text-black-2 mb-4">
          Manage Complaints Effectively
        </h2>
        <p className="text-lg max-w-2xl mx-auto text-grey-1 mb-6">
          A powerful complaint management system to log, track, and resolve
          issues within your agency.
        </p>
        <button className="bg-purple-1 text-grey-2 px-6 py-3 rounded-xl hover:bg-purple-2 transition">
          Get Started
        </button>
      </section>

      {/* Features */}
      <section id="features" className="py-20 bg-white px-6">
        <h3 className="text-3xl font-bold text-center text-black-1 mb-12">
          Key Features
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
          <FeatureCard
            title="Agency Management"
            description="Easily manage multiple agencies with proper category tagging."
          />
          <FeatureCard
            title="Complaint Tracking"
            description="Log complaints and track their status in real-time."
          />
          <FeatureCard
            title="Audit Logs"
            description="Every complaint update is logged and traceable through logs."
          />
        </div>
      </section>

      {/* About */}
      <section id="about" className="bg-grey-3 py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-3xl font-bold mb-4 text-black-1">
            About Our System
          </h3>
          <p className="text-gray-2 text-lg">
            Built with reliability and simplicity in mind, this system empowers
            government or corporate agencies to resolve complaints transparently
            and efficiently. With robust backend services and real-time updates,
            your organization will never miss an issue again.
          </p>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-20 px-6 bg-white">
        <div className="max-w-xl mx-auto text-center">
          <h3 className="text-3xl font-bold mb-4">Get In Touch</h3>
          <p className="text-gray-600 mb-6">
            Questions or feedback? We’d love to hear from you.
          </p>
          <button className="inline-block bg-purple-1 text-grey-2 px-6 py-3 rounded-xl hover:bg-purple-2">
            Contact Support
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-200 py-10 text-center text-sm text-purple-1">
        &copy; {new Date().getFullYear()} ComplaintTrack. All rights reserved.
      </footer>
    </div>
  );
}

function FeatureCard({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="bg-grey-3 p-6 rounded-xl shadow-sm hover:shadow-lg transition">
      <h4 className="text-xl font-semibold text-purple-1 mb-2">{title}</h4>
      <p className="text-gray-2">{description}</p>
    </div>
  );
}
