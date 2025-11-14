import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Music, Users, Calendar, Mail, Phone, MapPin, Crown, Star, Zap, Sparkles, Mic2, Leaf } from "lucide-react";
import { APP_LOGO, APP_TITLE } from "@/const";
import { useState, useEffect } from "react";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";

export default function Home() {
  const { user, loading } = useAuth();
  const [activeTab, setActiveTab] = useState("home");
  
  // Fetch upcoming events
  const { data: events = [], isLoading: eventsLoading } = trpc.events.getUpcoming.useQuery();
  
  // Newsletter signup
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterName, setNewsletterName] = useState("");
  const [newsletterPhone, setNewsletterPhone] = useState("");
  const newsletterMutation = trpc.newsletter.signup.useMutation();
  
  // Contact form
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const contactMutation = trpc.contact.submit.useMutation();

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) {
      toast.error("Please enter an email address");
      return;
    }
    
    try {
      await newsletterMutation.mutateAsync({
        email: newsletterEmail,
        name: newsletterName || undefined,
        phone: newsletterPhone || undefined,
      });
      toast.success("Successfully subscribed to our newsletter!");
      setNewsletterEmail("");
      setNewsletterName("");
      setNewsletterPhone("");
    } catch (error) {
      toast.error("Failed to subscribe. Please try again.");
    }
  };

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactForm.name || !contactForm.email || !contactForm.subject || !contactForm.message) {
      toast.error("Please fill in all required fields");
      return;
    }
    
    try {
      await contactMutation.mutateAsync(contactForm);
      toast.success("Your message has been sent successfully!");
      setContactForm({ name: "", email: "", phone: "", subject: "", message: "" });
    } catch (error) {
      toast.error("Failed to send message. Please try again.");
    }
  };

  const membershipTiers = [
    {
      name: "Community",
      price: "Free",
      description: "Join our growing community",
      features: [
        "Access to event calendar",
        "Newsletter updates",
        "Community forum access",
        "Special discounts on events",
      ],
      icon: Users,
      color: "border-gray-300",
    },
    {
      name: "VIP",
      price: "$50",
      period: "/6 months",
      description: "Enhanced member benefits",
      features: [
        "Everything in Community",
        "Priority event registration",
        "Exclusive VIP events",
        "10% discount on all events",
        "Member-only lounge access",
      ],
      icon: Star,
      color: "border-red-500",
      highlighted: true,
    },
    {
      name: "Elite",
      price: "$120",
      period: "/year",
      description: "Premium membership",
      features: [
        "Everything in VIP",
        "Unlimited event access",
        "20% discount on all services",
        "Private booking privileges",
        "Dedicated member concierge",
        "Exclusive merchandise",
      ],
      icon: Crown,
      color: "border-red-700",
    },
  ];

  const venueSpaces = [
    {
      name: "Event Space",
      icon: Mic2,
      description: "Our main event space features stunning red floors and diagonal wood walls creating an elegant, sophisticated atmosphere perfect for karaoke nights, performances, and special events.",
      capacity: "Up to 200 guests",
      features: [
        "AI Karaoke system with Infinite Setlist",
        "Professional sound and lighting",
        "Elegant red floor design",
        "Dramatic diagonal wood wall accents",
        "Full bar service",
      ],
      image: "🎤",
    },
    {
      name: "Lounge",
      icon: Sparkles,
      description: "Relax in our sophisticated lounge area with premium seating, ambient lighting, and the same beautiful architectural elements that define Lena's Place.",
      capacity: "Up to 100 guests",
      features: [
        "Comfortable seating areas",
        "Red floor aesthetic",
        "Diagonal wood wall design",
        "Full beverage service",
        "Perfect for conversations and networking",
      ],
      image: "🍸",
    },
    {
      name: "Outdoor Venue",
      icon: Leaf,
      description: "Experience entertainment under the stars in our 2-acre outdoor space. Perfect for outdoor concerts, festivals, and special events with the same premium Lena's Place experience.",
      capacity: "Up to 500 guests",
      features: [
        "2-acre outdoor grounds",
        "Event hosting capabilities",
        "Weather-protected areas",
        "Full catering available",
        "Unique outdoor entertainment options",
      ],
      image: "🌙",
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white border-b-2 border-red-600">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img src={APP_LOGO} alt={APP_TITLE} className="w-10 h-10" />
              <h1 className="text-2xl font-bold text-black">{APP_TITLE}</h1>
            </div>
            <div className="flex gap-6 text-sm font-medium">
              <button onClick={() => setActiveTab("home")} className={`hover:text-red-600 transition ${activeTab === "home" ? "text-red-600 border-b-2 border-red-600 pb-1" : ""}`}>Home</button>
              <button onClick={() => setActiveTab("venues")} className={`hover:text-red-600 transition ${activeTab === "venues" ? "text-red-600 border-b-2 border-red-600 pb-1" : ""}`}>Venues</button>
              <button onClick={() => setActiveTab("events")} className={`hover:text-red-600 transition ${activeTab === "events" ? "text-red-600 border-b-2 border-red-600 pb-1" : ""}`}>Events</button>
              <button onClick={() => setActiveTab("membership")} className={`hover:text-red-600 transition ${activeTab === "membership" ? "text-red-600 border-b-2 border-red-600 pb-1" : ""}`}>Membership</button>
              <button onClick={() => setActiveTab("contact")} className={`hover:text-red-600 transition ${activeTab === "contact" ? "text-red-600 border-b-2 border-red-600 pb-1" : ""}`}>Contact</button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section with Diagonal Design */}
      {activeTab === "home" && (
        <section className="relative bg-black text-white overflow-hidden">
          {/* Diagonal wood wall effect */}
          <div className="absolute inset-0 opacity-10">
            <svg viewBox="0 0 1200 600" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
              <defs>
                <pattern id="wood" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                  <rect x="0" y="0" width="100" height="100" fill="#8B4513" opacity="0.3"/>
                  <line x1="0" y1="0" x2="100" y2="100" stroke="#D2691E" strokeWidth="2" opacity="0.5"/>
                </pattern>
              </defs>
              <polygon points="0,0 1200,0 1200,600 0,600" fill="url(#wood)" transform="skewY(-5)"/>
            </svg>
          </div>

          {/* Red floor accent */}
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-red-600 to-transparent opacity-20"></div>

          <div className="relative container mx-auto px-4 py-24 z-10">
            <div className="max-w-3xl">
              <h2 className="text-6xl font-bold mb-4">Welcome to Lena's Place</h2>
              <p className="text-2xl text-gray-300 mb-8">
                Lake City's premier AI karaoke venue. An exclusive 25+ sophisticated atmosphere where music, community, and entertainment come together.
              </p>
              <p className="text-lg text-gray-400 mb-8">
                Experience elegance with stunning red floors and dramatic diagonal wood walls throughout our event space, lounge, and outdoor venue.
              </p>
              <div className="flex gap-4">
                <Button 
                  className="bg-red-600 hover:bg-red-700 text-white text-lg px-8 py-6"
                  onClick={() => setActiveTab("venues")}
                >
                  Explore Our Venues
                </Button>
                <Button 
                  variant="outline" 
                  className="border-white text-white hover:bg-white hover:text-black text-lg px-8 py-6"
                  onClick={() => setActiveTab("events")}
                >
                  View Events
                </Button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Venue Spaces Section */}
      {activeTab === "venues" && (
        <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold mb-4 text-center">Our Venues</h2>
            <p className="text-center text-gray-600 mb-16 text-lg">
              Three unique spaces, each featuring our signature red floors and diagonal wood wall design
            </p>
            
            <div className="space-y-12">
              {venueSpaces.map((space, idx) => {
                const IconComponent = space.icon;
                const isEven = idx % 2 === 0;
                
                return (
                  <div key={space.name} className={`flex flex-col ${isEven ? "md:flex-row" : "md:flex-row-reverse"} gap-8 items-center`}>
                    {/* Image Placeholder */}
                    <div className="flex-1">
                      <div className="relative bg-gradient-to-br from-red-600 to-red-800 rounded-lg overflow-hidden h-80 flex items-center justify-center border-4 border-red-700">
                        <div className="text-9xl opacity-50">{space.image}</div>
                        <div className="absolute inset-0 opacity-10">
                          <svg viewBox="0 0 400 300" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
                            <polygon points="0,0 400,0 400,300 0,300" fill="none" stroke="#8B4513" strokeWidth="2" opacity="0.5" transform="skewY(-3)"/>
                            <line x1="0" y1="0" x2="400" y2="300" stroke="#D2691E" strokeWidth="1" opacity="0.3"/>
                          </svg>
                        </div>
                      </div>
                      <p className="text-center text-gray-500 text-sm mt-4">Photo placeholder - Add your venue photos here</p>
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-4">
                        <IconComponent className="w-8 h-8 text-red-600" />
                        <h3 className="text-3xl font-bold">{space.name}</h3>
                      </div>
                      <p className="text-gray-700 mb-4 text-lg">{space.description}</p>
                      <p className="text-red-600 font-semibold mb-6 text-lg">Capacity: {space.capacity}</p>
                      
                      <div className="mb-6">
                        <h4 className="font-bold text-black mb-3">Features:</h4>
                        <ul className="space-y-2">
                          {space.features.map((feature, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <span className="text-red-600 font-bold mt-1">✓</span>
                              <span className="text-gray-700">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <Button className="bg-red-600 hover:bg-red-700 text-white">
                        Inquire About {space.name}
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Venue Rental Section */}
            <div className="mt-20 bg-black text-white rounded-lg p-12">
              <h3 className="text-3xl font-bold mb-4">Host Your Event</h3>
              <p className="text-gray-300 mb-6 text-lg">
                Looking to host a private event, corporate gathering, or special celebration? Our venues are perfect for any occasion. Contact us for custom packages and pricing.
              </p>
              <Button 
                className="bg-red-600 hover:bg-red-700 text-white text-lg px-8 py-6"
                onClick={() => setActiveTab("contact")}
              >
                Request a Venue Rental Quote
              </Button>
            </div>
          </div>
        </section>
      )}

      {/* Events Section */}
      {activeTab === "events" && (
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12">Upcoming Events</h2>
            {eventsLoading ? (
              <div className="flex justify-center py-12">
                <Loader2 className="animate-spin w-8 h-8 text-red-600" />
              </div>
            ) : events.length > 0 ? (
              <div className="grid md:grid-cols-2 gap-8">
                {events.map((event) => (
                  <Card key={event.id} className="border-gray-200 overflow-hidden hover:shadow-lg transition">
                    <CardHeader className="bg-gradient-to-r from-black to-red-900 text-white">
                      <CardTitle>{event.title}</CardTitle>
                      <CardDescription className="text-gray-300">
                        <div className="flex items-center gap-2 mt-2">
                          <Calendar className="w-4 h-4" />
                          {new Date(event.date).toLocaleDateString()} {event.time}
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          <MapPin className="w-4 h-4" />
                          {event.location}
                        </div>
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-6">
                      <p className="text-gray-700 mb-4">{event.description}</p>
                      {event.ticketPrice && (
                        <p className="text-lg font-bold text-red-600 mb-4">
                          ${(event.ticketPrice / 100).toFixed(2)}
                        </p>
                      )}
                      <Button className="w-full bg-red-600 hover:bg-red-700">Get Tickets</Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="border-gray-200">
                <CardContent className="pt-6 text-center py-12">
                  <p className="text-gray-500 text-lg">No upcoming events at the moment. Check back soon!</p>
                </CardContent>
              </Card>
            )}
          </div>
        </section>
      )}

      {/* Membership Section */}
      {activeTab === "membership" && (
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-4 text-center">Membership Tiers</h2>
            <p className="text-center text-gray-600 mb-12">Choose the perfect membership for you</p>
            <div className="grid md:grid-cols-3 gap-8">
              {membershipTiers.map((tier) => {
                const IconComponent = tier.icon;
                return (
                  <Card 
                    key={tier.name} 
                    className={`border-2 ${tier.color} ${tier.highlighted ? "shadow-xl scale-105" : "shadow-lg"}`}
                  >
                    <CardHeader className={tier.highlighted ? "bg-red-600 text-white" : "bg-gray-100"}>
                      <div className="flex items-center justify-between mb-2">
                        <CardTitle>{tier.name}</CardTitle>
                        <IconComponent className="w-6 h-6" />
                      </div>
                      <div className="text-3xl font-bold">
                        {tier.price}
                        {tier.period && <span className="text-lg">{tier.period}</span>}
                      </div>
                      <CardDescription className={tier.highlighted ? "text-red-100" : ""}>
                        {tier.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-6">
                      <ul className="space-y-3 mb-6">
                        {tier.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="text-red-600 font-bold mt-1">✓</span>
                            <span className="text-gray-700">{feature}</span>
                          </li>
                        ))}
                      </ul>
                      <Button 
                        className={`w-full ${tier.highlighted ? "bg-red-600 hover:bg-red-700" : "border-red-600 text-red-600 hover:bg-red-50"}`}
                        variant={tier.highlighted ? "default" : "outline"}
                      >
                        Join {tier.name}
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Contact Section */}
      {activeTab === "contact" && (
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-2xl">
            <h2 className="text-3xl font-bold mb-12">Get in Touch</h2>
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <Card className="border-gray-200">
                <CardHeader>
                  <Phone className="w-6 h-6 text-red-600 mb-2" />
                  <CardTitle>Phone</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">(843) 687-2098</p>
                </CardContent>
              </Card>
              <Card className="border-gray-200">
                <CardHeader>
                  <MapPin className="w-6 h-6 text-red-600 mb-2" />
                  <CardTitle>Location</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">Lake City, South Carolina</p>
                </CardContent>
              </Card>
            </div>

            <Card className="border-gray-200">
              <CardHeader>
                <CardTitle>Send us a Message</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleContactSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Name *</label>
                    <Input 
                      value={contactForm.name}
                      onChange={(e) => setContactForm({...contactForm, name: e.target.value})}
                      placeholder="Your name"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Email *</label>
                    <Input 
                      type="email"
                      value={contactForm.email}
                      onChange={(e) => setContactForm({...contactForm, email: e.target.value})}
                      placeholder="your@email.com"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Phone</label>
                    <Input 
                      value={contactForm.phone}
                      onChange={(e) => setContactForm({...contactForm, phone: e.target.value})}
                      placeholder="(123) 456-7890"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Subject *</label>
                    <Input 
                      value={contactForm.subject}
                      onChange={(e) => setContactForm({...contactForm, subject: e.target.value})}
                      placeholder="What is this about?"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Message *</label>
                    <Textarea 
                      value={contactForm.message}
                      onChange={(e) => setContactForm({...contactForm, message: e.target.value})}
                      placeholder="Your message here..."
                      rows={5}
                      required
                    />
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full bg-red-600 hover:bg-red-700"
                    disabled={contactMutation.isPending}
                  >
                    {contactMutation.isPending ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </section>
      )}

      {/* Newsletter Section */}
      <section className="bg-black text-white py-16">
        <div className="container mx-auto px-4 max-w-2xl">
          <div className="text-center mb-8">
            <Mail className="w-12 h-12 text-red-600 mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-2">Stay Updated</h3>
            <p className="text-gray-300">Subscribe to our newsletter for the latest events and exclusive offers</p>
          </div>
          <form onSubmit={handleNewsletterSubmit} className="space-y-4">
            <div>
              <Input 
                type="text"
                value={newsletterName}
                onChange={(e) => setNewsletterName(e.target.value)}
                placeholder="Your name (optional)"
                className="bg-gray-800 border-gray-700 text-white placeholder-gray-500"
              />
            </div>
            <div>
              <Input 
                type="email"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                placeholder="your@email.com"
                required
                className="bg-gray-800 border-gray-700 text-white placeholder-gray-500"
              />
            </div>
            <div>
              <Input 
                type="tel"
                value={newsletterPhone}
                onChange={(e) => setNewsletterPhone(e.target.value)}
                placeholder="Phone (optional)"
                className="bg-gray-800 border-gray-700 text-white placeholder-gray-500"
              />
            </div>
            <Button 
              type="submit" 
              className="w-full bg-red-600 hover:bg-red-700"
              disabled={newsletterMutation.isPending}
            >
              {newsletterMutation.isPending ? "Subscribing..." : "Subscribe"}
            </Button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-8 border-t-4 border-red-600">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <p>&copy; 2024 Lena's Place. All rights reserved.</p>
            <p className="text-sm mt-2">Lake City, South Carolina | (843) 687-2098</p>
            <p className="text-sm mt-4 text-gray-500">Featuring elegant red floors and diagonal wood wall design throughout</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
