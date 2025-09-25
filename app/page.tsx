"use client"

import { useState } from "react"
import { Grid, List, SlidersHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ProductCard } from "@/components/ui/product-card"
import { ProductFilter } from "@/components/ui/product-filter"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"

// Mock data
const products = [
  {
    id: "1",
    title: "Simple Way Of Piece Life",
    author: "Arthur Ramsey",
    price: 40000,
    originalPrice: 50000,
    rating: 4.5,
    reviewCount: 128,
    imageUrl: "/book-cover-simple-way.jpg",
    discount: 20,
    isBestseller: true,
  },
  {
    id: "2",
    title: "Great Travel At Desert",
    author: "Sanchi Howdy",
    price: 38000,
    rating: 4.2,
    reviewCount: 89,
    imageUrl: "/book-cover-travel-desert.jpg",
  },
  {
    id: "3",
    title: "The Lady Beauty Scarlett",
    author: "Arthur Doyle",
    price: 45000,
    rating: 4.8,
    reviewCount: 234,
    imageUrl: "/book-cover-lady-beauty.jpg",
    isBestseller: true,
  },
  {
    id: "4",
    title: "The Hypocrite World",
    author: "Sophia Hill",
    price: 42000,
    originalPrice: 48000,
    rating: 4.3,
    reviewCount: 156,
    imageUrl: "/book-cover-hypocrite-world.jpg",
    discount: 12,
  },
  {
    id: "5",
    title: "Modern Philosophy",
    author: "John Smith",
    price: 35000,
    rating: 4.1,
    reviewCount: 67,
    imageUrl: "/philosophy-book-cover.png",
  },
  {
    id: "6",
    title: "Digital Marketing Guide",
    author: "Sarah Johnson",
    price: 52000,
    originalPrice: 60000,
    rating: 4.6,
    reviewCount: 198,
    imageUrl: "/book-cover-marketing.png",
    discount: 13,
  },
]

export default function HomePage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [sortBy, setSortBy] = useState("popularity")

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center space-x-2 text-sm text-muted-foreground mb-6">
        <span>홈</span>
        <span>/</span>
        <span>카테고리</span>
        <span>/</span>
        <span className="text-foreground">전체 도서</span>
      </nav>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Desktop Filter Sidebar */}
        <aside className="hidden lg:block w-64 flex-shrink-0">
          <div className="sticky top-24">
            <ProductFilter />
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="text-2xl font-bold mb-2">전체 도서</h1>
              <p className="text-muted-foreground">
                총 <span className="font-medium">1,234</span>권의 도서가 있습니다.
              </p>
            </div>

            <div className="flex items-center gap-3">
              {/* Mobile Filter */}
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="sm" className="lg:hidden bg-transparent">
                    <SlidersHorizontal className="h-4 w-4 mr-2" />
                    필터
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-80">
                  <SheetHeader>
                    <SheetTitle>필터</SheetTitle>
                  </SheetHeader>
                  <div className="mt-6">
                    <ProductFilter />
                  </div>
                </SheetContent>
              </Sheet>

              {/* Sort */}
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="popularity">인기순</SelectItem>
                  <SelectItem value="newest">최신순</SelectItem>
                  <SelectItem value="price-low">가격 낮은순</SelectItem>
                  <SelectItem value="price-high">가격 높은순</SelectItem>
                  <SelectItem value="rating">평점순</SelectItem>
                </SelectContent>
              </Select>

              {/* View Mode */}
              <div className="flex border rounded-md">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                  className="rounded-r-none"
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                  className="rounded-l-none"
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className={viewMode === "grid" ? "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4" : "space-y-4"}>
            {products.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center mt-12">
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" disabled>
                이전
              </Button>
              <Button variant="default" size="sm">
                1
              </Button>
              <Button variant="outline" size="sm">
                2
              </Button>
              <Button variant="outline" size="sm">
                3
              </Button>
              <Button variant="outline" size="sm">
                다음
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
