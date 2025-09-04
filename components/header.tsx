"use client"

import Link from "next/link"
import { Search, ChevronDown, Globe, User, LogOut, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { useTranslation } from "@/lib/i18n/hooks"
import { useLanguage } from "@/lib/i18n/context"
import Image from "next/image"
import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { signOut } from "@/lib/actions/auth"

interface UserProfile {
  id: string
  email: string
  full_name?: string
  role: "student" | "staff" | "admin" | "super_admin"
  avatar_url?: string
}

export function Header() {
  const { t, isRTL } = useTranslation()
  const { language, setLanguage } = useLanguage()
  const [user, setUser] = useState<any>(null)
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)

  // Initialize Supabase and get user
  useEffect(() => {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    if (!supabaseUrl || !supabaseAnonKey) {
      console.warn("[Header] Supabase not configured")
      setLoading(false)
      return
    }

    const supabase = createClient()

    const fetchUser = async () => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser()
        setUser(user)

        if (user) {
          const { data: profile } = await supabase
            .from("user_profiles")
            .select("*")
            .eq("id", user.id)
            .single()
          setUserProfile(profile)
        }
      } catch (err) {
        console.error("[Header] Error fetching user:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchUser()

    const { data: subscription } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
      setUserProfile(null)

      if (session?.user) {
        supabase
          .from("user_profiles")
          .select("*")
          .eq("id", session.user.id)
          .single()
          .then(({ data }) => setUserProfile(data))
          .catch((err) => console.error("[Header] Error fetching profile:", err))
      }
      setLoading(false)
    })

    return () => subscription?.subscription.unsubscribe()
  }, [])

  // Navigation items
  const mainNavItems = [
    { name: t("nav.home"), href: "/" },
    {
      name: t("nav.literacy"),
      href: "/literacy-materials",
      hasDropdown: true,
      dropdownItems: [
        { name: t("home.literacy.title"), href: "/literacy-materials/basic" },
        { name: t("home.videos.title"), href: "/literacy-materials/videos" },
        { name: t("nav.literacy_nav"), href: "/literacy" },
        { name: t("our_heritage"), href: "https://soba-delta.vercel.app" },
      ],
    },
    { name: t("nav.newsletters"), href: "/newsletters" },
    { name: t("nav.wikipedia"), href: "https://en.wikipedia.org/wiki/Fur_language" },
    { name: t("nav.linguistic"), href: "/linguistic" },
    { name: t("nav.dictionary"), href: "https://v0-language-flame.vercel.app" },
    { name: t("nav.poems"), href: "/poems" },
    { name: t("nav.calendar"), href: "/calendar" },
    { name: t("nav.videos"), href: "/videos" },
    {
      name: t("nav.gallery"),
      href: "/gallery",
      hasDropdown: true,
      dropdownItems: [
        { name: t("nav.gallery") + " - Photos", href: "/gallery/photos" },
        { name: t("nav.gallery") + " - Videos", href: "/videos" },
        { name: t("nav.gallery") + " - Audio", href: "/gallery/audio" },
        { name: t("nav.gallery") + " - Staff", href: "/staff" },
      ],
    },
  ]

  const getRoleBadge = (role: UserProfile["role"]) => {
    const roleColors = {
      student: "bg-blue-100 text-blue-800",
      staff: "bg-blue-200 text-blue-900",
      admin: "bg-blue-300 text-blue-900",
      super_admin: "bg-blue-400 text-blue-950",
    }
    return (
      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${roleColors[role] || roleColors.student}`}>
        {role.replace("_", " ").toUpperCase()}
      </span>
    )
  }

  return (
    <header className="bg-blue-700 text-white">
      <div className="px-6 py-4">
        <div className={`flex items-center justify-between ${isRTL ? "flex-row-reverse" : ""}`}>
          {/* Logo */}
          <Link href="/" className="flex items-center gap-4 hover:opacity-90 transition-opacity">
            <div className="w-12 h-12 relative">
              <Image
                src="/images/fur-official-logo.png"
                alt="Iya'ŋ Dáálí - Fur Language and Culture Logo"
                width={48}
                height={48}
                className="rounded-full object-cover"
              />
            </div>
            <div className={isRTL ? "text-right" : "text-left"}>
              <h1 className="text-2xl font-bold">{t("site.title")}</h1>
            </div>
          </Link>

          {/* Right side */}
          <div className={`flex items-center gap-4 ${isRTL ? "flex-row-reverse" : ""}`}>
            {/* User Menu */}
            {loading ? (
              <div className="w-8 h-8 bg-blue-600 rounded-full animate-pulse" />
            ) : user && userProfile ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="text-white hover:bg-blue-600 gap-2">
                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                      <span className="text-sm font-semibold">
                        {userProfile.full_name?.charAt(0) || userProfile.email.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div className="text-left">
                      <div className="text-sm font-medium">{userProfile.full_name || "User"}</div>
                      {getRoleBadge(userProfile.role)}
                    </div>
                    <ChevronDown className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <div className="px-2 py-1.5">
                    <p className="text-sm font-medium">{userProfile.full_name || "User"}</p>
                    <p className="text-xs text-muted-foreground">{userProfile.email}</p>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/profile">
                      <User className="w-4 h-4 mr-2" />
                      {t("nav.profile")}
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/settings">
                      <Settings className="w-4 h-4 mr-2" />
                      {t("nav.settings")}
                    </Link>
                  </DropdownMenuItem>
                  {["staff", "admin", "super_admin"].includes(userProfile.role) && (
                    <>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild>
                        <Link href="/admin">
                          <Settings className="w-4 h-4 mr-2" />
                          {t("nav.admin")}
                        </Link>
                      </DropdownMenuItem>
                    </>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => signOut()} className="text-blue-600 focus:text-blue-600">
                    <LogOut className="w-4 h-4 mr-2" />
                    {t("auth.logout")}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              // Always show Sign In / Sign Up if no user
              <div className="flex items-center gap-2">
                <Button variant="ghost" className="text-white hover:bg-blue-600" asChild>
                  <Link href="/auth/login">{t("auth.login")}</Link>
                </Button>
                <Button variant="outline" className="text-blue-700 bg-white hover:bg-gray-100" asChild>
                  <Link href="/auth/signup">{t("auth.signup")}</Link>
                </Button>
              </div>
            )}

            {/* Language Selector */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="text-white hover:bg-blue-600 gap-2">
                  <Globe className="w-4 h-4" />
                  {language === "en"
                    ? t("language.english")
                    : language === "ar"
                    ? t("language.arabic")
                    : t("language.fur")}
                  <ChevronDown className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setLanguage("en")}>{t("language.english")}</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLanguage("ar")}>{t("language.arabic")}</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLanguage("fur")}>{t("language.fur")}</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Main Navigation */}
        <nav className="mt-6">
          <div className={`flex items-center gap-6 flex-wrap ${isRTL ? "flex-row-reverse" : ""}`}>
            {mainNavItems.map((item) => (
              <div key={item.name} className="relative">
                {item.hasDropdown ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="text-white hover:bg-blue-600 gap-1">
                        {item.name}
                        <ChevronDown className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      {item.dropdownItems?.map((dropdownItem) => (
                        <DropdownMenuItem key={dropdownItem.name} asChild>
                          <Link href={dropdownItem.href}>{dropdownItem.name}</Link>
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <Button variant="ghost" className="text-white hover:bg-blue-600" asChild>
                    <Link href={item.href}>{item.name}</Link>
                  </Button>
                )}
              </div>
            ))}

            <Button variant="ghost" size="icon" className="text-white hover:bg-blue-600">
              <Search className="w-5 h-5" />
            </Button>
          </div>
        </nav>
      </div>
    </header>
  )
}
