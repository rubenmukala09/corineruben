import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Cookie, Settings, BarChart3, Shield } from "lucide-react";
import { SEO } from "@/components/SEO";
import { SITE } from "@/config/site";

function CookiePolicy() {
  return (
    <div className="min-h-screen">
      <SEO
        title="Cookie Policy"
        description="Learn how InVision Network uses cookies and how to manage your preferences."
      />
      <Navigation />
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-center mb-4">Cookie Policy</h1>
            <p className="text-center text-muted-foreground mb-8 text-lg">
              Last Updated:{" "}
              {new Date().toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </p>
            <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
              This policy explains how InVision Network uses cookies and similar
              technologies when you visit our website.
            </p>

            {/* Cookie Types Overview */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
              <Card className="p-4 text-center">
                <Shield className="h-8 w-8 mx-auto mb-2 text-primary" />
                <h3 className="font-semibold text-sm">Essential</h3>
                <p className="text-xs text-muted-foreground">Required</p>
              </Card>
              <Card className="p-4 text-center">
                <Settings className="h-8 w-8 mx-auto mb-2 text-blue-500" />
                <h3 className="font-semibold text-sm">Functional</h3>
                <p className="text-xs text-muted-foreground">Optional</p>
              </Card>
              <Card className="p-4 text-center">
                <BarChart3 className="h-8 w-8 mx-auto mb-2 text-green-500" />
                <h3 className="font-semibold text-sm">Analytics</h3>
                <p className="text-xs text-muted-foreground">Optional</p>
              </Card>
              <Card className="p-4 text-center">
                <Cookie className="h-8 w-8 mx-auto mb-2 text-amber-500" />
                <h3 className="font-semibold text-sm">Marketing</h3>
                <p className="text-xs text-muted-foreground">Optional</p>
              </Card>
            </div>

            <Card className="p-8 mb-8">
              <div className="space-y-10 text-foreground">
                <section>
                  <h2 className="text-2xl font-bold mb-4">What Are Cookies?</h2>
                  <p className="text-muted-foreground mb-4">
                    Cookies are small text files that are stored on your device
                    when you visit a website. They help websites remember your
                    preferences, keep you logged in, and provide a better
                    browsing experience.
                  </p>
                  <p className="text-muted-foreground">
                    We also use similar technologies such as local storage,
                    session storage, and pixels to provide functionality and
                    gather analytics data.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold mb-4">
                    Types of Cookies We Use
                  </h2>

                  <div className="space-y-6">
                    <div className="border rounded-lg p-5">
                      <div className="flex items-center gap-3 mb-3">
                        <Shield className="h-6 w-6 text-primary" />
                        <h3 className="text-lg font-semibold">
                          Essential Cookies
                        </h3>
                        <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                          Required
                        </span>
                      </div>
                      <p className="text-muted-foreground mb-4">
                        These cookies are necessary for the website to function
                        properly. They cannot be disabled.
                      </p>
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left py-2">Cookie</th>
                            <th className="text-left py-2">Purpose</th>
                            <th className="text-left py-2">Duration</th>
                          </tr>
                        </thead>
                        <tbody className="text-muted-foreground">
                          <tr className="border-b">
                            <td className="py-2 font-mono text-xs">
                              sb-access-token
                            </td>
                            <td className="py-2">User authentication</td>
                            <td className="py-2">Session</td>
                          </tr>
                          <tr className="border-b">
                            <td className="py-2 font-mono text-xs">
                              sb-refresh-token
                            </td>
                            <td className="py-2">Keep user logged in</td>
                            <td className="py-2">7 days</td>
                          </tr>
                          <tr className="border-b">
                            <td className="py-2 font-mono text-xs">
                              cart-items
                            </td>
                            <td className="py-2">Shopping cart contents</td>
                            <td className="py-2">30 days</td>
                          </tr>
                          <tr className="border-b">
                            <td className="py-2 font-mono text-xs">
                              cookie-consent
                            </td>
                            <td className="py-2">
                              Remember cookie preferences
                            </td>
                            <td className="py-2">1 year</td>
                          </tr>
                          <tr>
                            <td className="py-2 font-mono text-xs">
                              csrf-token
                            </td>
                            <td className="py-2">Security protection</td>
                            <td className="py-2">Session</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    <div className="border rounded-lg p-5">
                      <div className="flex items-center gap-3 mb-3">
                        <Settings className="h-6 w-6 text-blue-500" />
                        <h3 className="text-lg font-semibold">
                          Functional Cookies
                        </h3>
                        <span className="text-xs bg-blue-500/10 text-blue-500 px-2 py-1 rounded">
                          Optional
                        </span>
                      </div>
                      <p className="text-muted-foreground mb-4">
                        These cookies enable enhanced functionality and
                        personalization, such as remembering your preferences.
                      </p>
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left py-2">Cookie</th>
                            <th className="text-left py-2">Purpose</th>
                            <th className="text-left py-2">Duration</th>
                          </tr>
                        </thead>
                        <tbody className="text-muted-foreground">
                          <tr className="border-b">
                            <td className="py-2 font-mono text-xs">
                              theme-preference
                            </td>
                            <td className="py-2">Light/dark mode setting</td>
                            <td className="py-2">1 year</td>
                          </tr>
                          <tr className="border-b">
                            <td className="py-2 font-mono text-xs">language</td>
                            <td className="py-2">Preferred language</td>
                            <td className="py-2">1 year</td>
                          </tr>
                          <tr>
                            <td className="py-2 font-mono text-xs">
                              last-visited
                            </td>
                            <td className="py-2">Resume where you left off</td>
                            <td className="py-2">30 days</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    <div className="border rounded-lg p-5">
                      <div className="flex items-center gap-3 mb-3">
                        <BarChart3 className="h-6 w-6 text-green-500" />
                        <h3 className="text-lg font-semibold">
                          Analytics Cookies
                        </h3>
                        <span className="text-xs bg-green-500/10 text-green-500 px-2 py-1 rounded">
                          Optional
                        </span>
                      </div>
                      <p className="text-muted-foreground mb-4">
                        These cookies help us understand how visitors interact
                        with our website, allowing us to improve the user
                        experience.
                      </p>
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left py-2">Cookie</th>
                            <th className="text-left py-2">Purpose</th>
                            <th className="text-left py-2">Duration</th>
                          </tr>
                        </thead>
                        <tbody className="text-muted-foreground">
                          <tr className="border-b">
                            <td className="py-2 font-mono text-xs">
                              _analytics_session
                            </td>
                            <td className="py-2">
                              Track page views per session
                            </td>
                            <td className="py-2">Session</td>
                          </tr>
                          <tr className="border-b">
                            <td className="py-2 font-mono text-xs">
                              _analytics_user
                            </td>
                            <td className="py-2">
                              Identify returning visitors
                            </td>
                            <td className="py-2">26 months</td>
                          </tr>
                          <tr>
                            <td className="py-2 font-mono text-xs">
                              scroll_depth
                            </td>
                            <td className="py-2">
                              Content engagement tracking
                            </td>
                            <td className="py-2">Session</td>
                          </tr>
                        </tbody>
                      </table>
                      <p className="text-muted-foreground mt-4 text-sm">
                        <strong>Note:</strong> We use first-party analytics and
                        do not share this data with third parties for
                        advertising purposes.
                      </p>
                    </div>

                    <div className="border rounded-lg p-5">
                      <div className="flex items-center gap-3 mb-3">
                        <Cookie className="h-6 w-6 text-amber-500" />
                        <h3 className="text-lg font-semibold">
                          Marketing Cookies
                        </h3>
                        <span className="text-xs bg-amber-500/10 text-amber-500 px-2 py-1 rounded">
                          Optional
                        </span>
                      </div>
                      <p className="text-muted-foreground mb-4">
                        These cookies are used to track visitors across websites
                        and display relevant advertisements.
                      </p>
                      <p className="text-muted-foreground text-sm">
                        <strong>Currently:</strong> We do not use third-party
                        marketing cookies. If this changes, we will update this
                        policy and request your consent.
                      </p>
                    </div>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-bold mb-4">
                    Managing Your Cookie Preferences
                  </h2>
                  <p className="text-muted-foreground mb-4">
                    You can control and manage cookies in several ways:
                  </p>

                  <h3 className="text-lg font-semibold mb-2">
                    Cookie Consent Banner
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    When you first visit our website, you'll see a cookie
                    consent banner. You can choose to accept all cookies or
                    customize your preferences. You can change these preferences
                    at any time by clicking the cookie settings link in our
                    footer.
                  </p>

                  <h3 className="text-lg font-semibold mb-2">
                    Browser Settings
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    Most web browsers allow you to control cookies through their
                    settings. You can:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4 mb-4">
                    <li>View what cookies are stored on your device</li>
                    <li>Delete individual cookies or all cookies</li>
                    <li>Block all cookies or third-party cookies</li>
                    <li>Set preferences for specific websites</li>
                  </ul>

                  <h3 className="text-lg font-semibold mb-2">
                    Browser-Specific Instructions
                  </h3>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                    <li>
                      <a
                        href="https://support.google.com/chrome/answer/95647"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline"
                      >
                        Google Chrome
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://support.mozilla.org/en-US/kb/cookies-information-websites-store-on-your-computer"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline"
                      >
                        Mozilla Firefox
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://support.apple.com/guide/safari/manage-cookies-sfri11471/mac"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline"
                      >
                        Safari
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://support.microsoft.com/en-us/windows/delete-and-manage-cookies-168dab11-0753-043d-7c16-ede5947fc64d"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline"
                      >
                        Microsoft Edge
                      </a>
                    </li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-bold mb-4">
                    Impact of Disabling Cookies
                  </h2>
                  <p className="text-muted-foreground mb-4">
                    If you choose to disable cookies, please be aware that some
                    features of our website may not function properly:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                    <li>You may need to log in each time you visit</li>
                    <li>Shopping cart items may not be saved</li>
                    <li>Preferences like dark mode won't be remembered</li>
                    <li>Some forms may not work correctly</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-bold mb-4">
                    Updates to This Policy
                  </h2>
                  <p className="text-muted-foreground mb-4">
                    We may update this Cookie Policy from time to time. We will
                    notify you of any significant changes by updating the "Last
                    Updated" date and, where appropriate, through the cookie
                    consent banner.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
                  <p className="text-muted-foreground mb-4">
                    If you have any questions about our use of cookies, please
                    contact us:
                  </p>
                  <div className="space-y-2 text-muted-foreground">
                    <p>
                      <strong>Email:</strong>{" "}
                      <a
                        href={`mailto:${SITE.emails.privacy}`}
                        className="text-primary hover:underline"
                      >
                        {SITE.emails.privacy}
                      </a>
                    </p>
                    <p>
                      <strong>Phone:</strong>{" "}
                      <a
                        href={SITE.phone.tel}
                        className="text-primary hover:underline"
                      >
                        {SITE.phone.display}
                      </a>
                    </p>
                  </div>
                </section>
              </div>
            </Card>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default CookiePolicy;
