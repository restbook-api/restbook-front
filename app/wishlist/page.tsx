"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Heart, ShoppingCart, Trash2, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"

interface WishlistItem {
  id: string
  title: string
  author: string
  price: number
  originalPrice?: number
  rating: number
  reviewCount: number
  imageUrl: string
  discount?: number
  isSelected: boolean
  addedDate: string
}

export default function WishlistPage() {
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([
    {
      id: "1",
      title: "WONT 차즈 크롭 가디건",
      author: "우체국택배",
      price: 28100,
      originalPrice: 33000,
      rating: 4.5,
      reviewCount: 128,
      imageUrl: "/placeholder.svg?height=120&width=90",
      discount: 15,
      isSelected: false,
      addedDate: "2025-02-04",
    },
  ])

  const [selectAll, setSelectAll] = useState(false)

  const toggleItemSelection = (id: string) => {
    setWishlistItems((items) =>
      items.map((item) => (item.id === id ? { ...item, isSelected: !item.isSelected } : item)),
    )
  }

  const toggleSelectAll = () => {
    const newSelectAll = !selectAll
    setSelectAll(newSelectAll)
    setWishlistItems((items) => items.map((item) => ({ ...item, isSelected: newSelectAll })))
  }

  const removeItem = (id: string) => {
    setWishlistItems((items) => items.filter((item) => item.id !== id))
  }

  const removeSelectedItems = () => {
    setWishlistItems((items) => items.filter((item) => !item.isSelected))
    setSelectAll(false)
  }

  const addSelectedToCart = () => {
    const selectedItems = wishlistItems.filter((item) => item.isSelected)
    console.log("Adding to cart:", selectedItems)
    // Add to cart logic here
  }

  const selectedCount = wishlistItems.filter((item) => item.isSelected).length

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center space-x-2 text-sm text-muted-foreground mb-6">
        <Link href="/" className="hover:text-primary">
          홈
        </Link>
        <span>/</span>
        <span className="text-foreground">관심도서</span>
      </nav>

      <div className="space-y-6">
        {/* Header */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Heart className="h-5 w-5" />
              관심도서
            </CardTitle>
            <CardDescription>찜한 도서를 확인하고 장바구니에 담아보세요</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                총 <span className="font-medium">{wishlistItems.length}</span>개의 관심도서가 있습니다.
              </p>
              {wishlistItems.length > 0 && (
                <div className="flex items-center space-x-2">
                  <Checkbox id="select-all" checked={selectAll} onCheckedChange={toggleSelectAll} />
                  <label htmlFor="select-all" className="text-sm font-medium cursor-pointer">
                    전체선택
                  </label>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Wishlist Items */}
        {wishlistItems.length === 0 ? (
          <Card>
            <CardContent className="text-center py-12">
              <Heart className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground mb-4">관심도서가 없습니다</p>
              <Button asChild>
                <Link href="/">도서 둘러보기</Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {/* Action Buttons */}
            <div className="flex justify-between items-center">
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" onClick={removeSelectedItems} disabled={selectedCount === 0}>
                  선택 삭제 ({selectedCount})
                </Button>
              </div>
              <Button onClick={addSelectedToCart} disabled={selectedCount === 0} className="btn-hover">
                <ShoppingCart className="h-4 w-4 mr-2" />
                선택상품 장바구니 담기 ({selectedCount})
              </Button>
            </div>

            {/* Items Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {wishlistItems.map((item) => (
                <Card key={item.id} className="group relative">
                  <CardContent className="p-4">
                    <div className="absolute top-2 left-2 z-10">
                      <Checkbox checked={item.isSelected} onCheckedChange={() => toggleItemSelection(item.id)} />
                    </div>

                    <div className="absolute top-2 right-2 z-10">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeItem(item.id)}
                        className="h-8 w-8 p-0 bg-background/80 hover:bg-background text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>

                    <div className="relative aspect-[3/4] mb-3 overflow-hidden rounded">
                      <Image
                        src={item.imageUrl || "/placeholder.svg"}
                        alt={item.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      {item.discount && (
                        <Badge variant="destructive" className="absolute top-2 left-2 text-xs">
                          {item.discount}% 할인
                        </Badge>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Link href={`/books/${item.id}`} className="block">
                        <h3 className="font-medium text-sm line-clamp-2 hover:text-primary transition-colors">
                          {item.title}
                        </h3>
                      </Link>

                      <p className="text-xs text-muted-foreground">{item.author}</p>

                      {/* Rating */}
                      <div className="flex items-center gap-1">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-3 w-3 ${
                                i < Math.floor(item.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-xs text-muted-foreground">({item.reviewCount})</span>
                      </div>

                      {/* Price */}
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-sm">{item.price.toLocaleString()}원</span>
                          {item.originalPrice && (
                            <span className="text-xs text-muted-foreground line-through">
                              {item.originalPrice.toLocaleString()}원
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground">관심등록: {item.addedDate}</p>
                      </div>

                      {/* Actions */}
                      <div className="flex space-x-2 pt-2">
                        <Button size="sm" className="flex-1" onClick={() => console.log("Add to cart:", item.id)}>
                          <ShoppingCart className="h-3 w-3 mr-1" />
                          담기
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => removeItem(item.id)}>
                          삭제
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
