import Image from "next/image"
import Link from "next/link"
import { Heart, ShoppingCart, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface ProductCardProps {
  id: string
  title: string
  author: string
  price: number
  originalPrice?: number
  rating: number
  reviewCount: number
  imageUrl: string
  isWishlisted?: boolean
  discount?: number
  isBestseller?: boolean
}

export function ProductCard({
  id,
  title,
  author,
  price,
  originalPrice,
  rating,
  reviewCount,
  imageUrl,
  isWishlisted = false,
  discount,
  isBestseller = false,
}: ProductCardProps) {
  return (
    <div className="group relative bg-card rounded-lg border border-border overflow-hidden hover:shadow-lg transition-all duration-300">
      {/* Image Container */}
      <div className="relative aspect-[3/4] overflow-hidden">
        <Image
          src={imageUrl || "/placeholder.svg"}
          alt={title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />

        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {isBestseller && (
            <Badge variant="destructive" className="text-xs">
              베스트셀러
            </Badge>
          )}
          {discount && (
            <Badge variant="secondary" className="text-xs">
              {discount}% 할인
            </Badge>
          )}
        </div>

        {/* Wishlist Button */}
        <Button
          variant="ghost"
          size="sm"
          className="absolute top-2 right-2 h-8 w-8 p-0 bg-background/80 hover:bg-background"
        >
          <Heart className={`h-4 w-4 ${isWishlisted ? "fill-red-500 text-red-500" : ""}`} />
        </Button>

        {/* Quick Add to Cart */}
        <div className="absolute bottom-2 left-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Button size="sm" className="w-full">
            <ShoppingCart className="h-4 w-4 mr-2" />
            장바구니 담기
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-2">
        <Link href={`/books/${id}`} className="block">
          <h3 className="font-medium text-sm line-clamp-2 hover:text-primary transition-colors">{title}</h3>
        </Link>

        <p className="text-xs text-muted-foreground">{author}</p>

        {/* Rating */}
        <div className="flex items-center gap-1">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-3 w-3 ${i < Math.floor(rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
              />
            ))}
          </div>
          <span className="text-xs text-muted-foreground">({reviewCount})</span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-2">
          <span className="font-semibold text-sm">{price.toLocaleString()}원</span>
          {originalPrice && (
            <span className="text-xs text-muted-foreground line-through">{originalPrice.toLocaleString()}원</span>
          )}
        </div>
      </div>
    </div>
  )
}
