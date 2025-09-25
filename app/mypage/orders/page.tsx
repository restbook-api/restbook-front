"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Package, Truck, CheckCircle, Calendar, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Order {
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
  }[]
  totalAmount: number
  shippingFee: number
}

export default function OrdersPage() {
  const [dateFilter, setDateFilter] = useState("3months")
  const [statusFilter, setStatusFilter] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")

  // Mock data
  const orders: Order[] = [
    {
      id: "1",
      orderNumber: "2025020413285",
      date: "2025-02-04",
      status: "delivered",
      items: [
        {
          id: "1",
          title: "[WONT/누적판매 5만장!] 코튼 여름 반팔 티셔츠",
          author: "우체국택배",
          price: 34000,
          quantity: 1,
          imageUrl: "/placeholder.svg?height=80&width=60",
        },
      ],
      totalAmount: 34000,
      shippingFee: 0,
    },
  ]

  const getStatusBadge = (status: Order["status"]) => {
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

  const getStatusIcon = (status: Order["status"]) => {
    switch (status) {
      case "pending":
        return <Calendar className="h-4 w-4" />
      case "preparing":
        return <Package className="h-4 w-4" />
      case "shipping":
        return <Truck className="h-4 w-4" />
      case "delivered":
        return <CheckCircle className="h-4 w-4" />
      default:
        return <Package className="h-4 w-4" />
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
        <span className="text-foreground">주문조회</span>
      </nav>

      <div className="space-y-6">
        {/* Header */}
        <Card>
          <CardHeader>
            <CardTitle>주문상세조회</CardTitle>
            <CardDescription>주문 내역을 확인하고 배송 상태를 추적하세요</CardDescription>
          </CardHeader>
          <CardContent>
            {/* Filters */}
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="flex items-center space-x-2">
                <label className="text-sm font-medium whitespace-nowrap">기간:</label>
                <Select value={dateFilter} onValueChange={setDateFilter}>
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1week">1주일</SelectItem>
                    <SelectItem value="1month">1개월</SelectItem>
                    <SelectItem value="3months">3개월</SelectItem>
                    <SelectItem value="6months">6개월</SelectItem>
                    <SelectItem value="1year">1년</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center space-x-2">
                <label className="text-sm font-medium whitespace-nowrap">상태:</label>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">전체</SelectItem>
                    <SelectItem value="pending">입금대기</SelectItem>
                    <SelectItem value="preparing">배송준비중</SelectItem>
                    <SelectItem value="shipping">배송중</SelectItem>
                    <SelectItem value="delivered">배송완료</SelectItem>
                    <SelectItem value="cancelled">주문취소</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex-1 flex items-center space-x-2">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    placeholder="상품명 또는 주문번호로 검색"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Button>검색</Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Order List */}
        <div className="space-y-4">
          {orders.length === 0 ? (
            <Card>
              <CardContent className="text-center py-12">
                <Package className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground mb-4">주문 내역이 없습니다</p>
                <Button asChild>
                  <Link href="/">쇼핑하러 가기</Link>
                </Button>
              </CardContent>
            </Card>
          ) : (
            orders.map((order) => (
              <Card key={order.id}>
                <CardHeader>
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="space-y-1">
                      <CardTitle className="text-lg">주문번호: {order.orderNumber}</CardTitle>
                      <CardDescription>주문일자: {order.date}</CardDescription>
                    </div>
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(order.status)}
                      {getStatusBadge(order.status)}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* Order Items */}
                    {order.items.map((item) => (
                      <div key={item.id} className="flex items-start space-x-4">
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
                          <div className="flex items-center justify-between">
                            <div className="text-sm">
                              <span className="font-medium">{item.price.toLocaleString()}원</span>
                              <span className="text-muted-foreground ml-2">수량: {item.quantity}</span>
                            </div>
                            <div className="flex space-x-2">
                              <Button variant="outline" size="sm">
                                배송조회
                              </Button>
                              <Button variant="outline" size="sm" asChild>
                                <Link href={`/mypage/orders/${order.id}`}>상세보기</Link>
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}

                    <Separator />

                    {/* Order Summary */}
                    <div className="flex justify-between items-center">
                      <div className="text-sm text-muted-foreground">총 {order.items.length}개 상품</div>
                      <div className="text-right">
                        <div className="text-sm text-muted-foreground">
                          상품금액: {order.totalAmount.toLocaleString()}원
                        </div>
                        <div className="text-sm text-muted-foreground">
                          배송비: {order.shippingFee.toLocaleString()}원
                        </div>
                        <div className="font-semibold">
                          총 결제금액: {(order.totalAmount + order.shippingFee).toLocaleString()}원
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
