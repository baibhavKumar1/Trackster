import Navbar from "../components/Navbar"
const About=()=> {
    return (
      <div className="w-full space-y-6 text-black">
      <Navbar/>
        <div className=" space-y-4 px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-2 text-center">
            <div className="space-y-2 text-center">
              <h1 className="text-3xl font-bold text-orange-400 tracking-tighter sm:text-5xl">Seamless Event Management</h1>
              <p className="max-w-[800px] text-gray-500 dark:text-gray-400">
                Plan, promote, and host events with ease using our all-in-one event management platform.
              </p>
            </div>
          </div>
        </div>
        <div className="bg-gray-100">
          <div className="py-12 grid gap-6 px-4 md:py-16 md:gap-12 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2 text-center">
                <h2 className="text-3xl font-bold text-orange-400 tracking-tighter sm:text-5xl">
                  Everything You Need for Successful Events
                </h2>
                <p className="max-w-[800px] text-gray-500 dark:text-gray-400">
                  Our platform is designed to simplify the entire event lifecycle. From small meetups to large
                  conferences, we&apos;ve got you covered.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-sm items-start gap-8 sm:max-w-4xl sm:grid-cols-2 md:gap-12 lg:max-w-5xl lg:grid-cols-3">
              <div className="grid gap-1">
                <h3 className="text-lg font-bold text-orange-400">Sleek Event Websites</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Create stunning event sites with customizable templates.
                </p>
              </div>
              <div className="grid gap-1">
                <h3 className="text-lg font-bold text-orange-400">Engagement Tools</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Keep attendees informed with event apps, live polling, and Q&A.
                </p>
              </div>
              <div className="grid gap-1">
                <h3 className="text-lg font-bold text-orange-400">Ticketing & Registration</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Sell tickets, manage registrations, and check-in attendees.
                </p>
              </div>
              <div className="grid gap-1">
                <h3 className="text-lg font-bold text-orange-400">Virtual & Hybrid Events</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Host online events with integrated video streaming and networking.
                </p>
              </div>
              <div className="grid gap-1">
                <h3 className="text-lg font-bold text-orange-400">Event Marketing</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Promote your events with email campaigns and social media tools.
                </p>
              </div>
              <div className="grid gap-1">
                <h3 className="text-lg font-bold text-orange-400">Onsite Experience</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Smoothly run in-person events with badge printing and session scanning.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="py-12 space-y-4 px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2 text-center">
              <h2 className="text-3xl font-bold text-orange-400 tracking-tighter sm:text-5xl">Elevate Your Events</h2>
              <p className="max-w-[800px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                Our platform provides a comprehensive suite of tools to help you deliver memorable and impactful events.
              </p>
            </div>
          </div>
          <div className="mx-auto max-w-2xl grid items-start gap-4">
            <div className="space-y-2">
              <h3 className="text-2xl font-bold text-orange-400">Seamless Event Registration and Check-In</h3>
              <p className="text-gray-500 dark:text-gray-400">
                Our platform offers a seamless registration process for attendees, allowing them to sign up for your
                events with ease. The check-in process is quick and efficient, with options for QR code scanning and badge
                printing.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl font-bold text-orange-400">Powerful Event Marketing</h3>
              <p className="text-gray-500 dark:text-gray-400">
                With our integrated marketing tools, you can create professional email campaigns to promote your events
                and engage your audience. You can also leverage social media integrations to reach a wider audience and
                drive registrations.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl font-bold text-orange-400">Engaging Virtual Events</h3>
              <p className="text-gray-500 dark:text-gray-400">
                Our platform provides all the features you need to host interactive and engaging virtual events. Attendees
                can access live streams, participate in chat discussions, and connect with speakers and other participants
                in virtual networking sessions.
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }
  
  export default About