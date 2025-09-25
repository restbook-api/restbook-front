"use client"
import Link from "next/link"
import Image from "next/image"
import { Package, Truck, CheckCircle, Calendar, MapPin, CreditCard, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

interface OrderDetail {
  id: string
  orderNumber: string
  date: string
  status: "pending" | "preparing" | "shipping" | "delivered" | "cancelled"
  items: {
    id: string
    title: string
    author: string
    price: number
    quantity: number
    imageUrl: string
    option?: string
  }[]
  shipping: {
    recipient: string
    phone: string
    address: string
    method: string
    trackingNumber?: string
    fee: number
  }
  payment: {
    method: string
    totalAmount: number
    discountAmount: number
    shippingFee: number
    finalAmount: number
    pointsUsed: number
    pointsEarned: number
  }
}

export default function OrderDetailPage({ params }: { params: { id: string } }) {
  // Mock data - in real app, fetch based on params.id
  const orderDetail: OrderDetail = {
    id: params.id,
    orderNumber: "2025020413285",
    date: "2025-02-04 13:28:53",
    status: "delivered",
    items: [
      {
        id: "1",
        title: "[WONT/누적판매 5만장!] 코튼 여름 반팔 티셔츠",
        author: "우체국택배",
        price: 34000,
        quantity: 1,
        imageUrl: "/placeholder.svg?height=80&width=60",
        option: "블랙/S/장-M",
      },
    ],
    shipping: {
      recipient: "홍길동",
      phone: "010-1234-5678",
      address: "서울특별시 강남구 테헤란로 123, 456호",
      method: "일반배송",
      trackingNumber: "1234567890",
      fee: 0,
    },
    payment: {
      method: "카드결제",
      totalAmount: 34000,
      discountAmount: 0,
      shippingFee: 0,
      finalAmount: 34000,
      pointsUsed: 0,
      pointsEarned: 340,
    },
  }

  const getStatusBadge = (status: OrderDetail["status"]) => {
    switch (status) {
      case "pending":
        return <Badge variant="secondary">입금대기</Badge>
      case "preparing":
        return <Badge variant="outline">배송준비중</Badge>
      case "shipping":
        return <Badge variant="default">배송중</Badge>
      case "delivered":
        return (
          <Badge variant="secondary" className="bg-green-100 text-green-800">
            배송완료
          </Badge>
        )
      case "cancelled":
        return <Badge variant="destructive">주문취소</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const getStatusIcon = (status: OrderDetail["status"]) => {
    switch (status) {
      case "pending":
        return <Calendar className="h-5 w-5" />
      case "preparing":
        return <Package className="h-5 w-5" />
      case "shipping":
        return <Truck className="h-5 w-5" />
      case "delivered":
        return <CheckCircle className="h-5 w-5" />
      default:
        return <Package className="h-5 w-5" />
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center space-x-2 text-sm text-muted-foreground mb-6">
        <Link href="/" className="hover:text-primary">
          홈
        </Link>
        <span>/</span>
        <Link href="/mypage" className="hover:text-primary">
          마이페이지
        </Link>
        <span>/</span>
        <Link href="/mypage/orders" className="hover:text-primary">
          주문조회
        </Link>
        <span>/</span>
        <span className="text-foreground">주문상세</span>
      </nav>

      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="sm" asChild>
              <Link href="/mypage/orders">
                <ArrowLeft className="h-4 w-4 mr-2" />
                목록으로
              </Link>
            </Button>
            <div>
              <h1 className="text-2xl font-bold">주문상세조회</h1>
              <p className="text-muted-foreground">주문번호: {orderDetail.orderNumber}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            {getStatusIcon(orderDetail.status)}
            {getStatusBadge(orderDetail.status)}
          </div>
        </div>

        {/* Order Info */}
        <Card>
          <CardHeader className="bg-muted/30">
            <CardTitle>주문정보</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h4 className="font-medium mb-2">주문일자</h4>
                <p className="text-sm text-muted-foreground">{orderDetail.date}</p>
              </div>
              <div>
                <h4 className="font-medium mb-2">주문자</h4>
                <p className="text-sm text-muted-foreground">{orderDetail.shipping.recipient}</p>
              </div>
              <div>
                <h4 className="font-medium mb-2">주문처리상태</h4>
                <p className="text-sm text-muted-foreground">배송 완료</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Order Items */}
        <Card>
          <CardHeader className="bg-muted/30">
            <CardTitle>
              주문상품 (총 {orderDetail.items.length}개 / {orderDetail.payment.finalAmount.toLocaleString()}원)
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-4">
              {orderDetail.items.map((item) => (
                <div key={item.id} className="flex items-start space-x-4 p-4 border rounded-lg">
                  <div className="relative w-16 h-20 flex-shrink-0">
                    <Image
                      src={item.imageUrl || "/placeholder.svg"}
                      alt={item.title}
                      fill
                      className="object-cover rounded"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-sm line-clamp-2 mb-1">{item.title}</h4>
                    <p className="text-xs text-muted-foreground mb-2">배송: {item.author}</p>
                    {item.option && <p className="text-xs text-muted-foreground mb-2">옵션: {item.option}</p>}
                    <div className="flex items-center justify-between">
                      <div className="text-sm">
                        <span className="font-medium">{item.price.toLocaleString()}원</span>
                        <span className="text-muted-foreground ml-2">수량: {item.quantity}개</span>
                      </div>
                      <Button variant="outline" size="sm">
                        배송조회
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Shipping Info */}
          <Card>
            <CardHeader className="bg-muted/30">
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                배송지정보
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              <div>
                <h4 className="font-medium mb-1">받는분</h4>
                <p className="text-sm text-muted-foreground">{orderDetail.shipping.recipient}</p>
              </div>
              <div>
                <h4 className="font-medium mb-1">우편번호</h4>
                <p className="text-sm text-muted-foreground">12345</p>
              </div>
              <div>
                <h4 className="font-medium mb-1">주소</h4>
                <p className="text-sm text-muted-foreground">{orderDetail.shipping.address}</p>
              </div>
              <div>
                <h4 className="font-medium mb-1">일반전화</h4>
                <p className="text-sm text-muted-foreground">-</p>
              </div>
              <div>
                <h4 className="font-medium mb-1">휴대전화</h4>
                <p className="text-sm text-muted-foreground">{orderDetail.shipping.phone}</p>
              </div>
              <div>
                <h4 className="font-medium mb-1">배송메시지</h4>
                <p className="text-sm text-muted-foreground">문앞에 놔주세요. 감사합니다 :)</p>
              </div>
            </CardContent>
          </Card>

          {/* Payment Info */}
          <Card>
            <CardHeader className="bg-muted/30">
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-4 w-4" />
                결제정보
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              <div>
                <h4 className="font-medium mb-1">결제수단</h4>
                <p className="text-sm text-muted-foreground">
                  카드결제
                  <br />
                  일시불 NH농협카드(1234)
                </p>
              </div>

              <Separator />

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>총 결제금액</span>
                  <span>{orderDetail.payment.finalAmount.toLocaleString()}원</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>총 상품금액</span>
                  <span>{orderDetail.payment.totalAmount.toLocaleString()}원</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>총 할인금액</span>
                  <span>{orderDetail.payment.discountAmount.toLocaleString()}원</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>배송비</span>
                  <span>{orderDetail.payment.shippingFee.toLocaleString()}원</span>
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>총 적립예정</span>
                  <span className="text-primary">{orderDetail.payment.pointsEarned}원</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
