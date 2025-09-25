"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Minus, Plus, Trash2, ChevronDown, ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"

interface CartItem {
  id: string
  title: string
  author: string
  price: number
  originalPrice?: number
  quantity: number
  imageUrl: string
  option?: string
  discount?: number
  points: number
  isSelected: boolean
}

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: "1",
      title: "WONT 차즈 크롭 가디건",
      author: "우체국택배",
      price: 28100,
      originalPrice: 33000,
      quantity: 1,
      imageUrl: "/placeholder.svg?height=120&width=90",
      option: "무료배송 / 개별배송",
      discount: 15,
      points: 300,
      isSelected: true,
    },
  ])

  const [selectAll, setSelectAll] = useState(true)
  const [shippingMethod, setShippingMethod] = useState("domestic")
  const router = useRouter()

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return
    setCartItems((items) => items.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item)))
  }

  const removeItem = (id: string) => {
    setCartItems((items) => items.filter((item) => item.id !== id))
  }

  const toggleItemSelection = (id: string) => {
    setCartItems((items) => items.map((item) => (item.id === id ? { ...item, isSelected: !item.isSelected } : item)))
  }

  const toggleSelectAll = () => {
    const newSelectAll = !selectAll
    setSelectAll(newSelectAll)
    setCartItems((items) => items.map((item) => ({ ...item, isSelected: newSelectAll })))
  }

  const selectedItems = cartItems.filter((item) => item.isSelected)
  const totalAmount = selectedItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const totalOriginalAmount = selectedItems.reduce(
    (sum, item) => sum + (item.originalPrice || item.price) * item.quantity,
    0,
  )
  const totalDiscount = totalOriginalAmount - totalAmount
  const shippingFee = totalAmount >= 33000 ? 0 : 4900
  const finalAmount = totalAmount + shippingFee

  const handleOrderSelected = () => {
    const selectedItemsData = selectedItems.map((item) => ({
      id: item.id,
      title: item.title,
      author: item.author,
      price: item.price,
      originalPrice: item.originalPrice,
      quantity: item.quantity,
      imageUrl: item.imageUrl,
      option: item.option,
      points: item.points,
    }))

    const queryParams = new URLSearchParams({
      items: JSON.stringify(selectedItemsData),
      totalAmount: totalAmount.toString(),
      shippingFee: shippingFee.toString(),
      finalAmount: finalAmount.toString(),
    })

    router.push(`/checkout?${queryParams.toString()}`)
  }

  const handleOrderAll = () => {
    const allItemsData = cartItems.map((item) => ({
      id: item.id,
      title: item.title,
      author: item.author,
      price: item.price,
      originalPrice: item.originalPrice,
      quantity: item.quantity,
      imageUrl: item.imageUrl,
      option: item.option,
      points: item.points,
    }))

    const allTotalAmount = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
    const allShippingFee = allTotalAmount >= 33000 ? 0 : 4900
    const allFinalAmount = allTotalAmount + allShippingFee

    const queryParams = new URLSearchParams({
      items: JSON.stringify(allItemsData),
      totalAmount: allTotalAmount.toString(),
      shippingFee: allShippingFee.toString(),
      finalAmount: allFinalAmount.toString(),
    })

    router.push(`/checkout?${queryParams.toString()}`)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center space-x-2 text-sm text-muted-foreground mb-6">
        <Link href="/" className="hover:text-primary">
          홈
        </Link>
        <span>/</span>
        <span className="text-foreground">장바구니</span>
      </nav>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Cart Items */}
        <div className="flex-1">
          <div className="bg-card rounded-lg border">
            {/* Header */}
            <div className="p-6 border-b bg-muted/30">
              <div className="flex items-center justify-between">
                <h1 className="text-xl font-bold">장바구니</h1>
                <ChevronDown className="h-5 w-5 text-muted-foreground" />
              </div>
              <p className="text-sm text-muted-foreground mt-1">일반상품 ({cartItems.length})</p>
            </div>

            {/* Cart Content */}
            <div className="p-6">
              {cartItems.length === 0 ? (
                <div className="text-center py-12">
                  <ShoppingBag className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground mb-4">장바구니가 비어있습니다</p>
                  <Button asChild>
                    <Link href="/">쇼핑 계속하기</Link>
                  </Button>
                </div>
              ) : (
                <div className="space-y-6">
                  {/* Select All */}
                  <div className="flex items-center space-x-2">
                    <Checkbox id="select-all" checked={selectAll} onCheckedChange={toggleSelectAll} />
                    <label htmlFor="select-all" className="text-sm font-medium cursor-pointer">
                      전체선택
                    </label>
                  </div>

                  {/* Cart Items */}
                  {cartItems.map((item) => (
                    <div key={item.id} className="border rounded-lg p-4">
                      <div className="flex items-start space-x-4">
                        <Checkbox checked={item.isSelected} onCheckedChange={() => toggleItemSelection(item.id)} />

                        <div className="relative w-20 h-24 flex-shrink-0">
                          <Image
                            src={item.imageUrl || "/placeholder.svg"}
                            alt={item.title}
                            fill
                            className="object-cover rounded"
                          />
                        </div>

                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium text-sm mb-1 line-clamp-2">{item.title}</h3>
                          <p className="text-xs text-muted-foreground mb-2">배송: {item.option}</p>

                          {item.discount && (
                            <Badge variant="secondary" className="text-xs mb-2">
                              {item.discount}% 할인
                            </Badge>
                          )}

                          <div className="flex items-center justify-between">
                            <div className="space-y-1">
                              <div className="flex items-center space-x-2">
                                {item.originalPrice && (
                                  <span className="text-xs text-muted-foreground line-through">
                                    {item.originalPrice.toLocaleString()}원
                                  </span>
                                )}
                                <span className="font-semibold text-sm">{item.price.toLocaleString()}원</span>
                              </div>
                              <p className="text-xs text-muted-foreground">적립: {item.points}원</p>
                            </div>

                            <div className="flex items-center space-x-2">
                              <div className="flex items-center border rounded">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-8 w-8 p-0"
                                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                >
                                  <Minus className="h-3 w-3" />
                                </Button>
                                <Input
                                  type="number"
                                  value={item.quantity}
                                  onChange={(e) => updateQuantity(item.id, Number.parseInt(e.target.value) || 1)}
                                  className="h-8 w-12 text-center border-0 p-0"
                                  min="1"
                                />
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-8 w-8 p-0"
                                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                >
                                  <Plus className="h-3 w-3" />
                                </Button>
                              </div>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => removeItem(item.id)}
                                className="text-muted-foreground hover:text-destructive"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* Action Buttons */}
                  <div className="flex justify-between items-center pt-4 border-t">
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        선택상품 삭제
                      </Button>
                      <Button variant="outline" size="sm">
                        품절상품 삭제
                      </Button>
                    </div>
                    <Button variant="outline" size="sm">
                      해외장바구니로 이동
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Shipping Options */}
          <div className="bg-card rounded-lg border mt-6 p-6">
            <h3 className="font-semibold mb-4">배송 옵션</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  id="domestic"
                  name="shipping"
                  value="domestic"
                  checked={shippingMethod === "domestic"}
                  onChange={(e) => setShippingMethod(e.target.value)}
                  className="w-4 h-4"
                />
                <label htmlFor="domestic" className="text-sm">
                  국내배송
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  id="international"
                  name="shipping"
                  value="international"
                  checked={shippingMethod === "international"}
                  onChange={(e) => setShippingMethod(e.target.value)}
                  className="w-4 h-4"
                />
                <label htmlFor="international" className="text-sm">
                  해외배송
                </label>
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-3">배송지는 최대 20개까지 등록 가능합니다.</p>
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:w-80">
          <div className="bg-card rounded-lg border p-6 sticky top-24">
            <h3 className="font-semibold mb-4">결제예상금액</h3>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span>총 상품금액</span>
                <span>{totalOriginalAmount.toLocaleString()}원</span>
              </div>

              <div className="flex justify-between text-red-600">
                <span>총 할인금액</span>
                <span>-{totalDiscount.toLocaleString()}원</span>
              </div>

              <div className="flex justify-between">
                <span>배송비</span>
                <span>{shippingFee.toLocaleString()}원</span>
              </div>

              <Separator />

              <div className="flex justify-between font-semibold text-base">
                <span>총 결제금액</span>
                <span>{finalAmount.toLocaleString()}원</span>
              </div>

              <div className="flex justify-between text-xs text-muted-foreground">
                <span>총 적립예정</span>
                <span>{selectedItems.reduce((sum, item) => sum + item.points, 0)}원</span>
              </div>
            </div>

            <div className="space-y-3 mt-6">
              <Button className="w-full" size="lg" disabled={selectedItems.length === 0} onClick={handleOrderSelected}>
                선택상품 주문하기
              </Button>
              <Button
                variant="outline"
                className="w-full bg-transparent"
                disabled={cartItems.length === 0}
                onClick={handleOrderAll}
              >
                전체상품 주문하기
              </Button>
            </div>

            <p className="text-xs text-muted-foreground text-center mt-4">33,000원 이상 구매 시 무료배송</p>
          </div>
        </div>
      </div>
    </div>
  )
}
