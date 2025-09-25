"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { useSearchParams } from "next/navigation"
import { ChevronDown, ChevronUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface CheckoutItem {
  id: string
  title: string
  author: string
  price: number
  originalPrice: number
  quantity: number
  imageUrl: string
  option?: string
}

export default function CheckoutPage() {
  const searchParams = useSearchParams()
  const [orderInfoExpanded, setOrderInfoExpanded] = useState(true)
  const [shippingExpanded, setShippingExpanded] = useState(true)
  const [orderItemsExpanded, setOrderItemsExpanded] = useState(true)
  const [discountExpanded, setDiscountExpanded] = useState(true)
  const [pointsExpanded, setPointsExpanded] = useState(true)
  const [paymentInfoExpanded, setPaymentInfoExpanded] = useState(true)
  const [paymentMethodExpanded, setPaymentMethodExpanded] = useState(true)

  const [useEscrow, setUseEscrow] = useState(false)

  const [orderForm, setOrderForm] = useState({
    name: "",
    email: "",
    phone: "",
    mobile: "",
    address: "",
  })

  const [checkoutItems, setCheckoutItems] = useState<CheckoutItem[]>([])
  const [orderTotals, setOrderTotals] = useState({
    totalAmount: 33000,
    shippingFee: 0,
    finalAmount: 28100,
  })

  useEffect(() => {
    const itemsParam = searchParams.get("items")
    const totalAmountParam = searchParams.get("totalAmount")
    const shippingFeeParam = searchParams.get("shippingFee")
    const finalAmountParam = searchParams.get("finalAmount")

    if (itemsParam) {
      try {
        const parsedItems = JSON.parse(decodeURIComponent(itemsParam))
        const formattedItems: CheckoutItem[] = parsedItems.map((item: any) => ({
          id: item.id,
          title: item.title,
          author: item.author,
          price: item.price,
          originalPrice: item.originalPrice || item.price,
          quantity: item.quantity,
          imageUrl: item.imageUrl || "/colorful-cardigan.jpg",
          option: item.option,
        }))

        setCheckoutItems(formattedItems)
        setOrderTotals({
          totalAmount: Number.parseInt(totalAmountParam || "33000"),
          shippingFee: Number.parseInt(shippingFeeParam || "0"),
          finalAmount: Number.parseInt(finalAmountParam || "28100"),
        })
      } catch (error) {
        // Default item if parsing fails
        setCheckoutItems([
          {
            id: "1",
            title: "WONT 치즈 크롭 가디건",
            author: "우체국택배",
            price: 28100,
            originalPrice: 33000,
            quantity: 1,
            imageUrl: "/colorful-cardigan.jpg",
            option: "무료배송 / 개별배송",
          },
        ])
      }
    } else {
      // Default item if no params
      setCheckoutItems([
        {
          id: "1",
          title: "WONT 치즈 크롭 가디건",
          author: "우체국택배",
          price: 28100,
          originalPrice: 33000,
          quantity: 1,
          imageUrl: "/colorful-cardigan.jpg",
          option: "무료배송 / 개별배송",
        },
      ])
    }
  }, [
    searchParams.get("items"),
    searchParams.get("totalAmount"),
    searchParams.get("shippingFee"),
    searchParams.get("finalAmount"),
  ])

  const totalAmount = orderTotals.totalAmount
  const shippingFee = orderTotals.shippingFee
  const finalAmount = orderTotals.finalAmount
  const productReward = checkoutItems.reduce((sum, item) => sum + item.quantity * 300, 0)

  const handleOrder = () => {
    // Order processing logic here
    alert("주문이 완료되었습니다!")
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-block border border-gray-300 px-6 py-2 bg-white">
          <span className="font-medium">로고 위치</span>
        </div>
        <h1 className="text-xl font-bold mt-6 mb-2">주문 / 결제</h1>
      </div>

      <div className="space-y-1">
        {/* Order Information */}
        <Card className="border-0 shadow-none">
          <CardHeader
            className="bg-gray-600 text-white py-3 px-4 cursor-pointer"
            onClick={() => setOrderInfoExpanded(!orderInfoExpanded)}
          >
            <CardTitle className="text-sm font-medium flex items-center justify-between">
              주문 정보
              {orderInfoExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </CardTitle>
          </CardHeader>
          {orderInfoExpanded && (
            <CardContent className="bg-white p-4 space-y-4">
              <div className="grid grid-cols-1 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm">
                    주문자
                  </Label>
                  <Input
                    id="name"
                    value={orderForm.name}
                    onChange={(e) => setOrderForm({ ...orderForm, name: e.target.value })}
                    className="h-9"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm">
                    이메일
                  </Label>
                  <div className="flex gap-2">
                    <Input
                      id="email"
                      value={orderForm.email}
                      onChange={(e) => setOrderForm({ ...orderForm, email: e.target.value })}
                      className="h-9"
                    />
                    <Select>
                      <SelectTrigger className="w-32 h-9">
                        <SelectValue placeholder="naver.com" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="naver.com">naver.com</SelectItem>
                        <SelectItem value="gmail.com">gmail.com</SelectItem>
                        <SelectItem value="daum.net">daum.net</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-sm">
                    일반전화
                  </Label>
                  <div className="flex gap-2">
                    <Select>
                      <SelectTrigger className="w-20 h-9">
                        <SelectValue placeholder="02" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="02">02</SelectItem>
                        <SelectItem value="031">031</SelectItem>
                        <SelectItem value="032">032</SelectItem>
                      </SelectContent>
                    </Select>
                    <span className="flex items-center">-</span>
                    <Input className="h-9" />
                    <span className="flex items-center">-</span>
                    <Input className="h-9" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="mobile" className="text-sm">
                    휴대전화
                  </Label>
                  <div className="flex gap-2">
                    <Select>
                      <SelectTrigger className="w-20 h-9">
                        <SelectValue placeholder="010" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="010">010</SelectItem>
                        <SelectItem value="011">011</SelectItem>
                        <SelectItem value="016">016</SelectItem>
                      </SelectContent>
                    </Select>
                    <span className="flex items-center">-</span>
                    <Input className="h-9" />
                    <span className="flex items-center">-</span>
                    <Input className="h-9" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address" className="text-sm">
                    주소
                  </Label>
                  <div className="flex gap-2">
                    <Input
                      id="address"
                      value={orderForm.address}
                      onChange={(e) => setOrderForm({ ...orderForm, address: e.target.value })}
                      className="h-9"
                    />
                    <Button variant="outline" size="sm" className="h-9 px-3 bg-transparent">
                      주소검색
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          )}
        </Card>

        {/* Shipping Information */}
        <Card className="border-0 shadow-none">
          <CardHeader
            className="bg-gray-600 text-white py-3 px-4 cursor-pointer"
            onClick={() => setShippingExpanded(!shippingExpanded)}
          >
            <CardTitle className="text-sm font-medium flex items-center justify-between">
              배송지
              {shippingExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </CardTitle>
          </CardHeader>
          {shippingExpanded && (
            <CardContent className="bg-white p-4">
              <div className="space-y-4">
                <Button variant="outline" className="w-full justify-center bg-transparent">
                  직접입력
                </Button>
                <div className="text-sm text-gray-600 space-y-1">
                  <p>(51417) 경남 창원시 성산구 용지로서로 449 누리플라자</p>
                  <p>지하 1층 1710호</p>
                  <p>010-5174-5441 / 02</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="same-address" />
                  <Label htmlFor="same-address" className="text-sm">
                    주문자와 배송지 정보 (주소)
                  </Label>
                  <Button variant="link" className="text-xs p-0 h-auto">
                    변경
                  </Button>
                </div>
                <div className="text-xs text-gray-500">(배송 전 연락) 받지 않겠습니다. (감사합니다. :)</div>
              </div>
            </CardContent>
          )}
        </Card>

        {/* Order Items */}
        <Card className="border-0 shadow-none">
          <CardHeader
            className="bg-gray-600 text-white py-3 px-4 cursor-pointer"
            onClick={() => setOrderItemsExpanded(!orderItemsExpanded)}
          >
            <CardTitle className="text-sm font-medium flex items-center justify-between">
              주문상품
              {orderItemsExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </CardTitle>
          </CardHeader>
          {orderItemsExpanded && (
            <CardContent className="bg-white p-4">
              <div className="space-y-4">
                {checkoutItems.map((item) => (
                  <div key={item.id} className="flex items-start space-x-3">
                    <div className="relative w-16 h-20 flex-shrink-0">
                      <Image
                        src={item.imageUrl || "/placeholder.svg"}
                        alt={item.title}
                        fill
                        className="object-cover rounded"
                      />
                    </div>
                    <div className="flex-1 space-y-1">
                      <div className="flex justify-between items-start">
                        <h4 className="font-medium text-sm">{item.title}</h4>
                        <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                          ×
                        </Button>
                      </div>
                      <p className="text-xs text-gray-500">배송: {item.option}</p>
                      <p className="text-xs text-gray-500">수량: {item.quantity}개</p>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-medium">{item.price.toLocaleString()}</span>
                        <span className="text-xs text-gray-400 line-through">
                          {item.originalPrice.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t">
                <div className="flex justify-between text-sm">
                  <span>배송비</span>
                  <span>{shippingFee === 0 ? "0 (무료)" : `${shippingFee.toLocaleString()}원`}</span>
                </div>
              </div>
            </CardContent>
          )}
        </Card>

        {/* Discount/Additional Payment */}
        <Card className="border-0 shadow-none">
          <CardHeader
            className="bg-gray-600 text-white py-3 px-4 cursor-pointer"
            onClick={() => setDiscountExpanded(!discountExpanded)}
          >
            <CardTitle className="text-sm font-medium flex items-center justify-between">
              할인/부가결제
              {discountExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </CardTitle>
          </CardHeader>
          {discountExpanded && (
            <CardContent className="bg-white p-4 space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>자동 할인</span>
                  <span>4,900</span>
                </div>
              </div>
            </CardContent>
          )}
        </Card>

        {/* Points */}
        <Card className="border-0 shadow-none">
          <CardHeader
            className="bg-gray-600 text-white py-3 px-4 cursor-pointer"
            onClick={() => setPointsExpanded(!pointsExpanded)}
          >
            <CardTitle className="text-sm font-medium flex items-center justify-between">
              적립금
              {pointsExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </CardTitle>
          </CardHeader>
          {pointsExpanded && (
            <CardContent className="bg-white p-4">
              <div className="text-center text-blue-600 text-lg font-medium">-4,500</div>
            </CardContent>
          )}
        </Card>

        {/* Payment Information */}
        <Card className="border-0 shadow-none">
          <CardHeader
            className="bg-gray-600 text-white py-3 px-4 cursor-pointer"
            onClick={() => setPaymentInfoExpanded(!paymentInfoExpanded)}
          >
            <CardTitle className="text-sm font-medium flex items-center justify-between">
              결제정보
              {paymentInfoExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </CardTitle>
          </CardHeader>
          {paymentInfoExpanded && (
            <CardContent className="bg-white p-4 space-y-3">
              <div className="flex justify-between text-sm">
                <span>주문상품</span>
                <span>{totalAmount.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>배송비</span>
                <span>{shippingFee.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm text-red-600">
                <span>할인/부가결제</span>
                <span>-4,900</span>
              </div>
              <div className="flex justify-between text-sm text-blue-600">
                <span>기본 할인</span>
                <span>-4,900</span>
              </div>
              <Separator />
              <div className="flex justify-between font-medium">
                <span>최종 결제 금액</span>
                <span className="text-lg">{finalAmount.toLocaleString()}</span>
              </div>
            </CardContent>
          )}
        </Card>

        {/* Payment Method */}
        <Card className="border-0 shadow-none">
          <CardHeader
            className="bg-gray-600 text-white py-3 px-4 cursor-pointer"
            onClick={() => setPaymentMethodExpanded(!paymentMethodExpanded)}
          >
            <CardTitle className="text-sm font-medium flex items-center justify-between">
              결제수단
              {paymentMethodExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </CardTitle>
          </CardHeader>
          {paymentMethodExpanded && (
            <CardContent className="bg-white p-4 space-y-4">
              <div className="space-y-3">
                <Button variant="outline" className="w-full justify-start text-blue-600 bg-transparent">
                  카드 결제
                </Button>

                <div className="flex items-center space-x-2">
                  <Checkbox id="escrow" checked={useEscrow} onCheckedChange={setUseEscrow} />
                  <Label htmlFor="escrow" className="text-sm">
                    에스크로(신용카드) 체크박스
                  </Label>
                </div>

                <div className="space-y-2">
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    무통장 입금
                  </Button>
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    가상계좌(인터넷뱅킹)
                  </Button>
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    삼성페이
                  </Button>
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    휴대폰 결제
                  </Button>
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    네이버페이
                  </Button>
                </div>
              </div>
            </CardContent>
          )}
        </Card>

        {/* Reward Benefits */}
        <div className="bg-white p-4 space-y-3">
          <h3 className="font-medium text-sm">적립 혜택</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>상품별 적립금</span>
              <span className="text-blue-600">{productReward}원</span>
            </div>
            <div className="flex justify-between">
              <span>등급 적립금</span>
              <span>0원</span>
            </div>
            <div className="flex justify-between">
              <span>쿠폰 적립금</span>
              <span>0원</span>
            </div>
            <Separator />
            <div className="flex justify-between font-medium">
              <span>적립 예상금액</span>
              <span className="text-blue-600">{productReward}원</span>
            </div>
          </div>
        </div>

        {/* Final Payment Button */}
        <Button className="w-full h-12 text-lg font-medium bg-blue-600 hover:bg-blue-700" onClick={handleOrder}>
          {finalAmount.toLocaleString()} 결제하기
        </Button>
      </div>
    </div>
  )
}
