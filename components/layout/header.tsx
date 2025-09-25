"use client"

import { useState } from "react"
import Link from "next/link"
import { Search, ShoppingCart, User, Menu, X, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">북</span>
            </div>
            <span className="font-bold text-xl text-primary">RestBook</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-sm font-medium hover:text-primary transition-colors">
              홈
            </Link>
            <Link href="/books" className="text-sm font-medium hover:text-primary transition-colors">
              도서
            </Link>
            <Link href="/categories" className="text-sm font-medium hover:text-primary transition-colors">
              카테고리
            </Link>
            <Link href="/bestsellers" className="text-sm font-medium hover:text-primary transition-colors">
              베스트셀러
            </Link>
          </nav>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input type="search" placeholder="도서 검색..." className="pl-10 pr-4 w-full" />
            </div>
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/wishlist">
                <Heart className="h-5 w-5" />
                <span className="sr-only">관심도서</span>
              </Link>
            </Button>
            <Button variant="ghost" size="sm" asChild className="relative">
              <Link href="/cart">
                <ShoppingCart className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-accent text-accent-foreground text-xs flex items-center justify-center">
                  2
                </span>
                <span className="sr-only">장바구니</span>
              </Link>
            </Button>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/login">
                <User className="h-5 w-5" />
                <span className="sr-only">로그인</span>
              </Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button variant="ghost" size="sm" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t bg-background">
            <div className="px-4 py-4 space-y-4">
              {/* Mobile Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input type="search" placeholder="도서 검색..." className="pl-10 pr-4 w-full" />
              </div>

              {/* Mobile Navigation */}
              <nav className="flex flex-col space-y-2">
                <Link href="/" className="text-sm font-medium py-2 hover:text-primary transition-colors">
                  홈
                </Link>
                <Link href="/books" className="text-sm font-medium py-2 hover:text-primary transition-colors">
                  도서
                </Link>
                <Link href="/categories" className="text-sm font-medium py-2 hover:text-primary transition-colors">
                  카테고리
                </Link>
                <Link href="/bestsellers" className="text-sm font-medium py-2 hover:text-primary transition-colors">
                  베스트셀러
                </Link>
              </nav>

              {/* Mobile Actions */}
              <div className="flex items-center justify-around pt-4 border-t">
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/wishlist" className="flex flex-col items-center gap-1">
                    <Heart className="h-5 w-5" />
                    <span className="text-xs">관심도서</span>
                  </Link>
                </Button>
                <Button variant="ghost" size="sm" asChild className="relative">
                  <Link href="/cart" className="flex flex-col items-center gap-1">
                    <div className="relative">
                      <ShoppingCart className="h-5 w-5" />
                      <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-accent text-accent-foreground text-xs flex items-center justify-center">
                        2
                      </span>
                    </div>
                    <span className="text-xs">장바구니</span>
                  </Link>
                </Button>
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/login" className="flex flex-col items-center gap-1">
                    <User className="h-5 w-5" />
                    <span className="text-xs">로그인</span>
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
