"use client"

import { useState } from "react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { HeroSection } from "@/components/sections/hero-section"
import { StatCard } from "@/components/ui/stat-card"
import { CtaBanner } from "@/components/sections/cta-banner"
import { Heart, Shield, FileText, CreditCard, Smartphone, Building, CheckCircle } from "lucide-react"

export default function DonatePage() {
  const [donationType, setDonationType] = useState<"one-time" | "monthly">("one-time")
  const [amount, setAmount] = useState<string>("")
  const [designation, setDesignation] = useState<string>("where-needed")
  const [paymentMethod, setPaymentMethod] = useState<string>("mpesa")

  const suggestedAmounts = ["1000", "2500", "5000", "10000"]

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <HeroSection
        title="Support Our Mission"
        subtitle="Your generosity transforms lives and builds hope for vulnerable children"
        description="Every donation makes a direct impact in the lives of children and families in Lwanda. Join us in breaking the cycle of poverty through faith-based development programs."
        backgroundImage="/children-celebrating-in-kenya-community.png"
      />

      {/* Impact Statistics */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-sans text-3xl font-bold text-foreground mb-4">Your Impact</h2>
            <p className="font-serif text-lg text-muted-foreground max-w-2xl mx-auto">
              See how your donations are making a real difference in our community.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            <StatCard
              value="KES 1,000"
              label="Provides"
              description="One month of nutritious meals for a child"
              icon={<Heart className="w-6 h-6 text-primary" />}
            />
            <StatCard
              value="KES 2,500"
              label="Covers"
              description="School fees and supplies for one term"
              icon={<FileText className="w-6 h-6 text-primary" />}
            />
            <StatCard
              value="KES 5,000"
              label="Supports"
              description="Healthcare for a family for six months"
              icon={<Shield className="w-6 h-6 text-primary" />}
            />
            <StatCard
              value="KES 10,000"
              label="Funds"
              description="Vocational training for one youth"
              icon={<CheckCircle className="w-6 h-6 text-primary" />}
            />
          </div>
        </div>
      </section>

      {/* Donation Form */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-sans text-3xl md:text-4xl font-bold text-foreground mb-4">Make a Donation</h2>
              <p className="font-serif text-lg text-muted-foreground">
                Choose your donation amount and how you'd like to support our programs.
              </p>
            </div>

            <div className="bg-card border border-border rounded-lg p-8">
              {/* Donation Type */}
              <div className="mb-8">
                <h3 className="font-sans text-xl font-semibold text-foreground mb-4">Donation Type</h3>
                <div className="flex gap-4">
                  <button
                    onClick={() => setDonationType("one-time")}
                    className={`flex-1 p-4 rounded-lg border transition-colors ${
                      donationType === "one-time"
                        ? "bg-primary text-primary-foreground border-primary"
                        : "bg-background border-border hover:bg-muted"
                    }`}
                  >
                    <div className="font-sans font-semibold mb-1">One-Time Gift</div>
                    <div className="text-sm opacity-90">Make a single donation</div>
                  </button>
                  <button
                    onClick={() => setDonationType("monthly")}
                    className={`flex-1 p-4 rounded-lg border transition-colors ${
                      donationType === "monthly"
                        ? "bg-primary text-primary-foreground border-primary"
                        : "bg-background border-border hover:bg-muted"
                    }`}
                  >
                    <div className="font-sans font-semibold mb-1">Monthly Giving</div>
                    <div className="text-sm opacity-90">Ongoing monthly support</div>
                  </button>
                </div>
              </div>

              {/* Amount Selection */}
              <div className="mb-8">
                <h3 className="font-sans text-xl font-semibold text-foreground mb-4">Donation Amount (KES)</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  {suggestedAmounts.map((suggestedAmount) => (
                    <button
                      key={suggestedAmount}
                      onClick={() => setAmount(suggestedAmount)}
                      className={`p-4 rounded-lg border transition-colors ${
                        amount === suggestedAmount
                          ? "bg-primary text-primary-foreground border-primary"
                          : "bg-background border-border hover:bg-muted"
                      }`}
                    >
                      <div className="font-sans font-semibold">
                        KES {Number.parseInt(suggestedAmount).toLocaleString()}
                      </div>
                    </button>
                  ))}
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-serif text-muted-foreground">Custom Amount:</span>
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="Enter amount"
                    className="flex-1 p-3 border border-border rounded-lg bg-input focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>
              </div>

              {/* Program Designation */}
              <div className="mb-8">
                <h3 className="font-sans text-xl font-semibold text-foreground mb-4">Designate Your Gift</h3>
                <select
                  value={designation}
                  onChange={(e) => setDesignation(e.target.value)}
                  className="w-full p-3 border border-border rounded-lg bg-input focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  <option value="where-needed">Where Needed Most</option>
                  <option value="child-survival">Child Survival Intervention</option>
                  <option value="sponsorship">Child Development through Sponsorship</option>
                  <option value="youth-development">Youth Development Program</option>
                  <option value="general-operations">General Operations</option>
                </select>
                <p className="font-serif text-sm text-muted-foreground mt-2">
                  "Where Needed Most" allows us to direct your gift to our most urgent needs.
                </p>
              </div>

              {/* Payment Method */}
              <div className="mb-8">
                <h3 className="font-sans text-xl font-semibold text-foreground mb-4">Payment Method</h3>
                <div className="grid md:grid-cols-3 gap-4">
                  <button
                    onClick={() => setPaymentMethod("mpesa")}
                    className={`p-4 rounded-lg border transition-colors ${
                      paymentMethod === "mpesa"
                        ? "bg-primary text-primary-foreground border-primary"
                        : "bg-background border-border hover:bg-muted"
                    }`}
                  >
                    <Smartphone className="w-6 h-6 mx-auto mb-2" />
                    <div className="font-sans font-semibold">M-Pesa</div>
                    <div className="text-sm opacity-90">Paybill: {"{M-Pesa Paybill}"}</div>
                  </button>
                  <button
                    onClick={() => setPaymentMethod("card")}
                    className={`p-4 rounded-lg border transition-colors ${
                      paymentMethod === "card"
                        ? "bg-primary text-primary-foreground border-primary"
                        : "bg-background border-border hover:bg-muted"
                    }`}
                  >
                    <CreditCard className="w-6 h-6 mx-auto mb-2" />
                    <div className="font-sans font-semibold">Credit/Debit Card</div>
                    <div className="text-sm opacity-90">Secure online payment</div>
                  </button>
                  <button
                    onClick={() => setPaymentMethod("bank")}
                    className={`p-4 rounded-lg border transition-colors ${
                      paymentMethod === "bank"
                        ? "bg-primary text-primary-foreground border-primary"
                        : "bg-background border-border hover:bg-muted"
                    }`}
                  >
                    <Building className="w-6 h-6 mx-auto mb-2" />
                    <div className="font-sans font-semibold">Bank Transfer</div>
                    <div className="text-sm opacity-90">Direct bank deposit</div>
                  </button>
                </div>
              </div>

              {/* Donation Summary */}
              <div className="bg-muted rounded-lg p-6 mb-8">
                <h4 className="font-sans text-lg font-semibold text-foreground mb-4">Donation Summary</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="font-serif text-muted-foreground">Type:</span>
                    <span className="font-serif text-foreground capitalize">{donationType.replace("-", " ")}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-serif text-muted-foreground">Amount:</span>
                    <span className="font-serif text-foreground">
                      KES {amount ? Number.parseInt(amount).toLocaleString() : "0"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-serif text-muted-foreground">Designation:</span>
                    <span className="font-serif text-foreground capitalize">
                      {designation.replace("-", " ").replace(/\b\w/g, (l) => l.toUpperCase())}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-serif text-muted-foreground">Payment:</span>
                    <span className="font-serif text-foreground capitalize">{paymentMethod.replace("-", " ")}</span>
                  </div>
                </div>
              </div>

              {/* Donate Button */}
              <button
                disabled={!amount}
                className="w-full bg-primary text-primary-foreground py-4 rounded-lg font-sans font-semibold text-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {donationType === "monthly" ? "Start Monthly Giving" : "Donate Now"}
              </button>

              <div className="mt-6 text-center">
                <p className="font-serif text-sm text-muted-foreground">
                  Your donation is secure and you will receive a receipt for tax purposes.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Other Ways to Give */}
      <section className="py-16 bg-card">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-sans text-3xl md:text-4xl font-bold text-foreground mb-4">Other Ways to Give</h2>
            <p className="font-serif text-lg text-muted-foreground max-w-2xl mx-auto">
              There are several ways to support our mission beyond online donations.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Building className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-sans text-xl font-semibold text-foreground mb-4">Bank Transfer</h3>
              <div className="font-serif text-muted-foreground space-y-1">
                <p>
                  <strong>Bank:</strong> {"{Bank Name}"}
                </p>
                <p>
                  <strong>Account:</strong> {"{Account Number}"}
                </p>
                <p>
                  <strong>Account Name:</strong> KE 258 Lwanda CDC
                </p>
              </div>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <FileText className="w-8 h-8 text-secondary" />
              </div>
              <h3 className="font-sans text-xl font-semibold text-foreground mb-4">Check/Cash</h3>
              <div className="font-serif text-muted-foreground">
                <p>Deliver checks or cash donations directly to our office in Lwanda.</p>
                <p className="mt-2">
                  <strong>Contact:</strong> {"{Phone Number}"}
                </p>
              </div>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-sans text-xl font-semibold text-foreground mb-4">In-Kind Donations</h3>
              <div className="font-serif text-muted-foreground">
                <p>Donate supplies, equipment, or services that support our programs.</p>
                <p className="mt-2">Contact us to discuss current needs.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Transparency */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-sans text-3xl md:text-4xl font-bold text-foreground mb-8">
              Our Commitment to Transparency
            </h2>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-card border border-border rounded-lg p-6">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-sans text-xl font-semibold text-foreground mb-3">Financial Accountability</h3>
                <p className="font-serif text-muted-foreground">
                  We provide regular financial reports and ensure that donations are used efficiently and effectively
                  for program delivery.
                </p>
              </div>

              <div className="bg-card border border-border rounded-lg p-6">
                <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <FileText className="w-6 h-6 text-secondary" />
                </div>
                <h3 className="font-sans text-xl font-semibold text-foreground mb-3">Impact Reporting</h3>
                <p className="font-serif text-muted-foreground">
                  Receive regular updates on how your donations are making a difference in the lives of children and
                  families.
                </p>
              </div>
            </div>

            <div className="mt-8">
              <button className="bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:opacity-90 transition-opacity">
                View Financial Reports
              </button>
            </div>
          </div>
        </div>
      </section>

      <CtaBanner
        title="Every Gift Makes a Difference"
        description="Your generosity provides hope, opportunity, and transformation for vulnerable children in Lwanda. Thank you for partnering with us."
        primaryCta={{ text: "Donate Now", href: "#donation-form" }}
        secondaryCta={{ text: "Learn More", href: "/about" }}
      />

      <SiteFooter />
    </div>
  )
}
