'use client'

import { useRouter } from 'next/navigation'
import { useUser } from '@/context/UserContext'
import Image from 'next/image'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

const SquigglyUnderline = () => (
  <svg
    className="absolute -bottom-2 left-0 w-full"
    viewBox="0 0 100 7"
    preserveAspectRatio="none"
    style={{ height: '0.5rem' }}
  >
    <path
      d="M0,5 Q20,3.5 40,5 T80,5 T120,5"
      stroke="rgb(52, 211, 153)"
      strokeOpacity="0.3"
      strokeWidth="4"
      fill="none"
    />
  </svg>
);

export default function Home() {
  const router = useRouter()
  const { session } = useUser()
  const supabase = createClientComponentClient()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/')
    router.refresh()
  }

  const handleAction = () => {
    if (session) {
      router.push('/dashboard')
    } else {
      router.push('/login')
    }
  }

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Navigation */}
      <nav className="border-b border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <div className="flex-shrink-0 h-10 w-auto flex items-center">
                <img
                  src="/logo-square.png"
                  alt="Strike Logo"
                  className="h-full w-auto object-contain"
                />
              </div>
              <span className="text-2xl font-bold text-gray-900 relative inline-block ml-3">
                launchbooster.io
                <div className="absolute bottom-0 left-0 w-full h-1 bg-emerald-400/30 
                              transform -rotate-1 translate-y-1"></div>
              </span>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-center space-x-4">
                <a href="#features" className="text-gray-600 hover:text-gray-900 px-3 py-2 text-sm font-medium">Features</a>
                <a href="#demo" className="text-gray-600 hover:text-gray-900 px-3 py-2 text-sm font-medium">Demo</a>
                <a href="#pricing" className="text-gray-600 hover:text-gray-900 px-3 py-2 text-sm font-medium">Pricing</a>
                {session ? (
                  <>
                    <button
                      onClick={() => router.push('/dashboard')}
                      className="px-4 py-2 bg-emerald-500 text-white rounded-lg text-sm font-medium
                             hover:bg-emerald-600 transform hover:scale-105 active:scale-95
                             transition duration-200 ease-in-out shadow-sm"
                    >
                      Toolkit Dashboard
                    </button>
                    <button
                      onClick={handleLogout}
                      className="ml-4 px-4 py-2 bg-emerald-500 text-white rounded-lg text-sm font-medium
                             hover:bg-emerald-600 transform hover:scale-105 active:scale-95
                             transition duration-200 ease-in-out shadow-sm"
                    >
                      Log Out
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => router.push('/login')}
                    className="ml-8 px-4 py-2 bg-emerald-500 text-white rounded-lg text-sm font-medium
                             hover:bg-emerald-600 transform hover:scale-105 active:scale-95
                             transition duration-200 ease-in-out shadow-sm"
                  >
                    Log In
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-12 lg:gap-8">
            <div className="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left">
              <h1 className="text-4xl tracking-tight font-extrabold sm:text-5xl xl:text-6xl">
                <span className="block text-gray-900 relative inline-block">
                  Got a business idea?
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-emerald-400/30 
                                transform -rotate-1 translate-y-1"></div>
                </span>
                <span className="block text-emerald-500 mt-2">Not sure how to launch?</span>
                <span className="block text-gray-900 relative inline-block mt-2">
                  You're in the right place.
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-emerald-400/30 
                                transform -rotate-1 translate-y-1"></div>
                </span>
              </h1>
              <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
                Our AI model analyses your concept and generates all the documents you need to succeed: evaluation report, strategy plan, roadmap, task breakdown, cost tracker, and custom investor pitch deck. All populaated and fully tailored to your use case.
              </p>
              <p className="mt-2 text-sm text-emerald-600 font-medium">
                Average completion time: 10 minutes
              </p>
              <div className="mt-8 sm:max-w-lg sm:mx-auto sm:text-center lg:text-left">
                <button
                  onClick={handleAction}
                  className="px-8 py-4 bg-emerald-500 text-white rounded-lg text-base font-medium
                           hover:bg-emerald-600 transform hover:scale-105 active:scale-95
                           transition duration-200 ease-in-out shadow-sm"
                >
                  {session ? 'Generate New Toolkit' : 'Activate Founder Mode'}
                </button>
              </div>
            </div>
            <div className="mt-12 relative sm:max-w-lg sm:mx-auto lg:mt-0 lg:max-w-none lg:mx-0 lg:col-span-6 lg:flex lg:items-center">
              <div className="relative mx-auto w-full rounded-lg shadow-lg lg:max-w-md">
                <div className="relative block w-full bg-white rounded-lg overflow-hidden border border-gray-200">
                  <video
                    className="w-full h-full object-cover"
                    controls
                  >
                    <source src="/videos/demo_draft.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl relative inline-block">
              Everything You Need to Succeed
              <div className="absolute bottom-0 left-0 w-full h-1 bg-emerald-400/30 
                            transform -rotate-1 translate-y-1"></div>
            </h2>
            <p className="mt-4 text-xl text-gray-500">
              Using proven frameworks from leading accelerators and VCs:
            </p>
            <div className="mt-6 flex justify-center items-center space-x-16">
              <div className="h-14 flex items-center transition-all duration-200">
                <img 
                  src="/y-combinator-logo.png" 
                  alt="Y Combinator" 
                  className="h-full w-auto object-contain" 
                />
              </div>
              <div className="h-14 w-32 flex items-center transition-all duration-200 overflow-hidden">
                <img 
                  src="/sequoia-logo.png" 
                  alt="Sequoia Capital" 
                  className="h-[80%] w-auto object-contain -ml-1" 
                />
              </div>
            </div>
          </div>

          <div className="mt-20 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: "🎯",
                title: "Idea Evaluation",
                description: "Get your business idea evaluated using Y Combinator's proven frameworks"
              },
              {
                icon: "📋",
                title: "Launch Strategy",
                description: "Receive a comprehensive business launch strategy document"
              },
              {
                icon: "🗺️",
                title: "Visual Roadmap",
                description: "Clear visual diagram showing your path from idea to launch"
              },
              {
                icon: "✅",
                title: "Task Manager",
                description: "Detailed work breakdown structure with every task needed to launch"
              },
              {
                icon: "💰",
                title: "Cost Tracker",
                description: "Spreadsheet to track and manage all launch-related expenses"
              },
              {
                icon: "🎭",
                title: "Pitch Deck",
                description: "Professional pitch deck ready to present to investors"
              }
            ].map((feature, index) => (
              <div key={index} className="relative p-6 bg-white rounded-lg shadow-sm border border-gray-200">
                <div className="text-3xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 relative inline-block">
                  {feature.title}
                  <div className="absolute bottom-0 left-0 w-full h-0.5 bg-emerald-400/30"></div>
                </h3>
                <p className="mt-2 text-gray-500">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Demo Section */}
      <section id="demo" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl relative inline-block">
              Demo
              <SquigglyUnderline />
            </h2>
            <p className="mt-4 text-xl text-gray-500">
              Watch how launchbooster helps entrepreneurs turn their ideas into successful businesses
            </p>
          </div>

          {/* Video Container */}
          <div className="max-w-3xl mx-auto relative">
            <div className="aspect-video bg-gray-50 rounded-xl overflow-hidden border border-gray-200 shadow-sm">
              <video
                className="w-full h-full object-cover"
                controls
              >
                <source src="/videos/demo_draft.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
            <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-emerald-50 rounded-full 
                          opacity-50 z-0"></div>
            <div className="absolute -top-4 -left-4 w-32 h-32 bg-emerald-50 rounded-full 
                          opacity-30 z-0"></div>
          </div>

          {/* Call to Action */}
          <div className="mt-16 text-center">
            <button
              onClick={handleAction}
              className="inline-flex items-center px-6 py-3 bg-emerald-500 text-white 
                       rounded-lg text-sm font-medium hover:bg-emerald-600 
                       transform hover:scale-105 active:scale-95
                       transition duration-200 ease-in-out shadow-sm gap-2"
            >
              <span>Get Started</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl relative inline-block">
              Simple, One-Time Pricing
              <div className="absolute bottom-0 left-0 w-full h-1 bg-emerald-400/30 
                            transform -rotate-1 translate-y-1"></div>
            </h2>
            <p className="mt-4 text-xl text-gray-500">
              Pay only for what you need, when you need it
            </p>
          </div>

          <div className="mt-16 max-w-2xl mx-auto">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
              <div className="p-8">
                <h3 className="text-2xl font-semibold text-gray-900 relative inline-block">
                  Business Launch Toolkit
                  <div className="absolute bottom-0 left-0 w-full h-0.5 bg-emerald-400/30"></div>
                </h3>
                <p className="mt-4 text-gray-500">Instantly generate everything you need to launch your business</p>
                <ul className="mt-8 space-y-4">
                  <li className="flex items-center">
                    <span className="text-emerald-500 mr-2">✓</span>
                    <span className="text-gray-500">Business Idea Evaluation Report (PDF)</span>
                  </li>
                  <li className="flex items-center">
                    <span className="text-emerald-500 mr-2">✓</span>
                    <span className="text-gray-500">Launch Strategy Document (PDF)</span>
                  </li>
                  <li className="flex items-center">
                    <span className="text-emerald-500 mr-2">✓</span>
                    <span className="text-gray-500">Visual Roadmap Diagram (PDF)</span>
                  </li>
                  <li className="flex items-center">
                    <span className="text-emerald-500 mr-2">✓</span>
                    <span className="text-gray-500">Task Management Spreadsheet</span>
                  </li>
                  <li className="flex items-center">
                    <span className="text-emerald-500 mr-2">✓</span>
                    <span className="text-gray-500">Cost Tracking Spreadsheet</span>
                  </li>
                  <li className="flex items-center">
                    <span className="text-emerald-500 mr-2">✓</span>
                    <span className="text-gray-500">Investor Pitch Deck (PDF & PowerPoint)</span>
                  </li>
                </ul>
              </div>
              <div className="px-8 pb-8">
                <button
                  onClick={handleAction}
                  className="w-full px-4 py-3 bg-emerald-500 text-white rounded-lg text-sm font-medium
                           hover:bg-emerald-600 transform hover:scale-105 active:scale-95
                           transition duration-200 ease-in-out shadow-sm"
                >
                  Generate Now →
                </button>
              </div>
            </div>

            <div className="mt-8 text-center">
              <p className="text-gray-500">Need multiple toolkits or custom solutions?</p>
              <a href="#" className="text-emerald-500 hover:text-emerald-400 mt-2 inline-block">
                Contact us for pricing →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl relative inline-block">
              How It Works
              <div className="absolute bottom-0 left-0 w-full h-1 bg-emerald-400/30 
                            transform -rotate-1 translate-y-1"></div>
            </h2>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-4">
            <div className="text-center">
              <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl text-emerald-600">1</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Answer Questions</h3>
              <p className="text-gray-500">Complete our Y Combinator-inspired questionnaire about your business idea</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl text-emerald-600">2</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">AI Analysis</h3>
              <p className="text-gray-500">Our model evaluates your idea and creates your launch strategy</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl text-emerald-600">3</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Generate Assets</h3>
              <p className="text-gray-500">Get your evaluation, strategy, roadmap, and pitch deck</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl text-emerald-600">4</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Start Executing</h3>
              <p className="text-gray-500">Use the task manager and cost tracker to begin your launch</p>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl relative inline-block">
              Trusted by Founders
              <div className="absolute bottom-0 left-0 w-full h-1 bg-emerald-400/30 
                            transform -rotate-1 translate-y-1"></div>
            </h2>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-gray-200"></div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold">Sarah Chen</h3>
                  <p className="text-gray-500">Tech Startup Founder</p>
                </div>
              </div>
              <p className="text-gray-600">"Generated my pitch deck in 45 minutes. Secured a meeting with investors the next week."</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-gray-200"></div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold">Marcus Rodriguez</h3>
                  <p className="text-gray-500">E-commerce Founder</p>
                </div>
              </div>
              <p className="text-gray-600">"The financial planning tools helped me understand exactly what I needed to launch."</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-gray-200"></div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold">Lisa Thompson</h3>
                  <p className="text-gray-500">SaaS Founder</p>
                </div>
              </div>
              <p className="text-gray-600">"The roadmap feature saved me months of planning. Clear, actionable steps."</p>
            </div>
          </div>

          <div className="mt-12 text-center">
            <p className="text-2xl font-bold text-gray-900">500+</p>
            <p className="text-gray-500">Founders Launched</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-gray-900 font-semibold mb-4">Product</h3>
              <ul className="space-y-2">
                <li><a href="#features" className="text-gray-600 hover:text-gray-900">Features</a></li>
                <li><a href="#pricing" className="text-gray-600 hover:text-gray-900">Pricing</a></li>
                <li><a href="#demo" className="text-gray-600 hover:text-gray-900">Demo</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-gray-900 font-semibold mb-4">Company</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-600 hover:text-gray-900">About</a></li>
                <li><a href="#" className="text-gray-600 hover:text-gray-900">Blog</a></li>
                <li><a href="#" className="text-gray-600 hover:text-gray-900">Careers</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-gray-900 font-semibold mb-4">Support</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-600 hover:text-gray-900">Help Center</a></li>
                <li><a href="#" className="text-gray-600 hover:text-gray-900">Documentation</a></li>
                <li><a href="#" className="text-gray-600 hover:text-gray-900">Contact</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-gray-900 font-semibold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-600 hover:text-gray-900">Privacy</a></li>
                <li><a href="#" className="text-gray-600 hover:text-gray-900">Terms</a></li>
                <li><a href="#" className="text-gray-600 hover:text-gray-900">Security</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-200 text-center">
            <p className="text-gray-500">&copy; 2024 Strike. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
