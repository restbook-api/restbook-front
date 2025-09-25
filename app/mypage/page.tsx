"use client"

import { useState } from "react"
import Link from "next/link"
import { User, Package, Heart, MapPin, CreditCard, Gift, Settings, ChevronRight } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { PasswordVerificationModal } from "@/components/auth/password-verification-modal"

export default function MyPage() {
  const [showPasswordModal, setShowPasswordModal] = useState(false)

  const handlePasswordVerification = (password: string) => {
    // Verify password logic here
    console.log("Password verified:", password)
    // Navigate to profile edit page
  }

  const orderStats = {
    pending: 0,
    preparing: 0,
    shipping: 0,
    delivered: 0,
  }

  const userInfo = {
    name: "홍길동",
    email: "hong@example.com",
    membershipLevel: "FRIENDS",
    points: 0,
    coupons: 1,
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center space-x-2 text-sm text-muted-foreground mb-6">
        <Link href="/" className="hover:text-primary">
          홈
        </Link>
        <span>/</span>
        <span className="text-foreground">마이페이지</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar Navigation */}
        <aside className="lg:col-span-1">
          <Card>
            <CardHeader>
              <div className="flex items-center space-x-2">
                <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center">
                  <User className="h-5 w-5 text-primary-foreground" />
                </div>
                <div>
                  <CardTitle className="text-lg">{userInfo.name}</CardTitle>
                  <CardDescription>{userInfo.membershipLevel} 회원</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-2">
              <Link
                href="/mypage"
                className="flex items-center justify-between p-2 rounded hover:bg-muted transition-colors text-primary font-medium"
              >
                <span>마이쇼핑</span>
                <ChevronRight className="h-4 w-4" />
              </Link>
              <Link
                href="/mypage/orders"
                className="flex items-center justify-between p-2 rounded hover:bg-muted transition-colors"
              >
                <span>주문조회</span>
                <ChevronRight className="h-4 w-4" />
              </Link>
              <Link
                href="/mypage/profile"
                className="flex items-center justify-between p-2 rounded hover:bg-muted transition-colors"
              >
                <span>회원정보</span>
                <ChevronRight className="h-4 w-4" />
              </Link>
              <Link
                href="/mypage/coupons"
                className="flex items-center justify-between p-2 rounded hover:bg-muted transition-colors"
              >
                <span>쿠폰 및 적립금</span>
                <ChevronRight className="h-4 w-4" />
              </Link>
              <Link
                href="/mypage/addresses"
                className="flex items-center justify-between p-2 rounded hover:bg-muted transition-colors"
              >
                <span>배송 주소록 관리</span>
                <ChevronRight className="h-4 w-4" />
              </Link>
            </CardContent>
          </Card>
        </aside>

        {/* Main Content */}
        <main className="lg:col-span-3 space-y-8">
          {/* Welcome Section */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">마이쇼핑</CardTitle>
              <CardDescription>
                <span className="font-medium text-primary">{userInfo.name}</span>님의 구매등급은{" "}
                <Badge variant="secondary">{userInfo.membershipLevel}</Badge>입니다.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-muted-foreground">
                <p>
                  적립금: {userInfo.points}원 쿠폰: {userInfo.coupons}개
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Order Status */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5" />
                나의 주문처리 현황
              </CardTitle>
              <CardDescription>최근 3개월 기준</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-muted-foreground">{orderStats.pending}</div>
                  <div className="text-sm text-muted-foreground">입금전</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-muted-foreground">{orderStats.preparing}</div>
                  <div className="text-sm text-muted-foreground">배송준비중</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-muted-foreground">{orderStats.shipping}</div>
                  <div className="text-sm text-muted-foreground">배송중</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-muted-foreground">{orderStats.delivered}</div>
                  <div className="text-sm text-muted-foreground">배송완료</div>
                </div>
              </div>

              <Separator className="my-4" />

              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-sm text-muted-foreground mb-1">취소: 0</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground mb-1">교환: 0</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground mb-1">반품: 0</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-6">
                <Link href="/mypage/orders" className="flex items-center space-x-3">
                  <Package className="h-8 w-8 text-primary" />
                  <div>
                    <h3 className="font-medium">주문조회</h3>
                    <p className="text-sm text-muted-foreground">주문 내역을 확인하세요</p>
                  </div>
                </Link>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-6">
                <Link href="/wishlist" className="flex items-center space-x-3">
                  <Heart className="h-8 w-8 text-primary" />
                  <div>
                    <h3 className="font-medium">관심도서</h3>
                    <p className="text-sm text-muted-foreground">찜한 도서를 확인하세요</p>
                  </div>
                </Link>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-6">
                <Link href="/mypage/addresses" className="flex items-center space-x-3">
                  <MapPin className="h-8 w-8 text-primary" />
                  <div>
                    <h3 className="font-medium">배송주소록</h3>
                    <p className="text-sm text-muted-foreground">배송지를 관리하세요</p>
                  </div>
                </Link>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-6">
                <Link href="/mypage/coupons" className="flex items-center space-x-3">
                  <Gift className="h-8 w-8 text-primary" />
                  <div>
                    <h3 className="font-medium">쿠폰 및 적립금</h3>
                    <p className="text-sm text-muted-foreground">혜택을 확인하세요</p>
                  </div>
                </Link>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-6">
                <div onClick={() => setShowPasswordModal(true)} className="flex items-center space-x-3">
                  <Settings className="h-8 w-8 text-primary" />
                  <div>
                    <h3 className="font-medium">회원정보 수정</h3>
                    <p className="text-sm text-muted-foreground">개인정보를 수정하세요</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-6">
                <Link href="/mypage/points" className="flex items-center space-x-3">
                  <CreditCard className="h-8 w-8 text-primary" />
                  <div>
                    <h3 className="font-medium">적립금 내역</h3>
                    <p className="text-sm text-muted-foreground">적립금을 확인하세요</p>
                  </div>
                </Link>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>

      {/* Password Verification Modal */}
      <PasswordVerificationModal
        isOpen={showPasswordModal}
        onClose={() => setShowPasswordModal(false)}
        onVerify={handlePasswordVerification}
        title="회원정보 수정"
        description="회원정보 수정을 위해 현재 비밀번호를 입력해주세요."
      />
    </div>
  )
}
