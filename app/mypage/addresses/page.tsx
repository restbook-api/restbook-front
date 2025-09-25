"use client"

import { useState } from "react"
import Link from "next/link"
import { Plus, MapPin, Edit, Trash2, Star, Home } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AddressForm } from "@/components/address/address-form"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

interface Address {
  id: string
  name: string
  recipient: string
  phone: string
  postcode: string
  address1: string
  address2: string
  isDefault: boolean
  entranceMethod?: string
  entrancePassword?: string
}

export default function AddressesPage() {
  const [addresses, setAddresses] = useState<Address[]>([
    {
      id: "1",
      name: "집",
      recipient: "홍길동",
      phone: "010-1234-5678",
      postcode: "12345",
      address1: "서울특별시 강남구 테헤란로 123",
      address2: "456호",
      isDefault: true,
      entranceMethod: "공동현관 출입방법",
      entrancePassword: "2*5*",
    },
  ])

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [editingAddress, setEditingAddress] = useState<Address | null>(null)

  const handleAddAddress = (addressData: Omit<Address, "id">) => {
    const newAddress: Address = {
      ...addressData,
      id: Date.now().toString(),
    }
    setAddresses([...addresses, newAddress])
    setIsAddDialogOpen(false)
  }

  const handleEditAddress = (addressData: Omit<Address, "id">) => {
    if (editingAddress) {
      setAddresses(
        addresses.map((addr) => (addr.id === editingAddress.id ? { ...addressData, id: editingAddress.id } : addr)),
      )
      setEditingAddress(null)
    }
  }

  const handleDeleteAddress = (id: string) => {
    setAddresses(addresses.filter((addr) => addr.id !== id))
  }

  const handleSetDefault = (id: string) => {
    setAddresses(addresses.map((addr) => ({ ...addr, isDefault: addr.id === id })))
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
        <span className="text-foreground">배송 주소록 관리</span>
      </nav>

      <div className="space-y-6">
        {/* Header */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              배송 주소록 관리
            </CardTitle>
            <CardDescription>
              자주 사용하는 배송지를 등록하고 관리하세요. 최대 20개까지 등록 가능합니다.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div className="text-sm text-muted-foreground">
                등록된 주소: <span className="font-medium">{addresses.length}</span>/20개
              </div>
              <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="btn-hover">
                    <Plus className="h-4 w-4 mr-2" />
                    배송지 추가
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>새 배송지 추가</DialogTitle>
                    <DialogDescription>새로운 배송지 정보를 입력해주세요.</DialogDescription>
                  </DialogHeader>
                  <AddressForm onSubmit={handleAddAddress} onCancel={() => setIsAddDialogOpen(false)} />
                </DialogContent>
              </Dialog>
            </div>
          </CardContent>
        </Card>

        {/* Address List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {addresses.map((address) => (
            <Card key={address.id} className={`relative ${address.isDefault ? "ring-2 ring-primary" : ""}`}>
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <Home className="h-4 w-4 text-muted-foreground" />
                    <CardTitle className="text-base">{address.name}</CardTitle>
                    {address.isDefault && (
                      <Badge variant="default" className="text-xs">
                        기본배송지
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center space-x-1">
                    <Dialog
                      open={editingAddress?.id === address.id}
                      onOpenChange={(open) => setEditingAddress(open ? address : null)}
                    >
                      <DialogTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <Edit className="h-3 w-3" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                        <DialogHeader>
                          <DialogTitle>배송지 수정</DialogTitle>
                          <DialogDescription>배송지 정보를 수정해주세요.</DialogDescription>
                        </DialogHeader>
                        <AddressForm
                          initialData={address}
                          onSubmit={handleEditAddress}
                          onCancel={() => setEditingAddress(null)}
                        />
                      </DialogContent>
                    </Dialog>

                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>배송지 삭제</AlertDialogTitle>
                          <AlertDialogDescription>
                            이 배송지를 삭제하시겠습니까? 삭제된 배송지는 복구할 수 없습니다.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>취소</AlertDialogCancel>
                          <AlertDialogAction onClick={() => handleDeleteAddress(address.id)}>삭제</AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="font-medium text-sm">{address.recipient}</p>
                  <p className="text-sm text-muted-foreground">{address.phone}</p>
                </div>

                <div className="text-sm">
                  <p className="text-muted-foreground">({address.postcode})</p>
                  <p>{address.address1}</p>
                  <p>{address.address2}</p>
                </div>

                {address.entranceMethod && (
                  <div className="text-sm">
                    <p className="text-muted-foreground">{address.entranceMethod}</p>
                    {address.entrancePassword && (
                      <p className="text-muted-foreground">비밀번호: {address.entrancePassword}</p>
                    )}
                  </div>
                )}

                {!address.isDefault && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleSetDefault(address.id)}
                    className="w-full mt-3"
                  >
                    <Star className="h-3 w-3 mr-1" />
                    기본배송지로 설정
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}

          {/* Add New Address Card */}
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Card className="border-dashed border-2 hover:border-primary transition-colors cursor-pointer">
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <Plus className="h-8 w-8 text-muted-foreground mb-2" />
                  <p className="text-sm text-muted-foreground">새 배송지 추가</p>
                </CardContent>
              </Card>
            </DialogTrigger>
          </Dialog>
        </div>

        {addresses.length === 0 && (
          <Card>
            <CardContent className="text-center py-12">
              <MapPin className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground mb-4">등록된 배송지가 없습니다</p>
              <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />첫 번째 배송지 추가하기
                  </Button>
                </DialogTrigger>
              </Dialog>
            </CardContent>
          </Card>
        )}

        {/* Info */}
        <Card className="bg-muted/30">
          <CardContent className="pt-6">
            <h3 className="font-medium mb-2">배송지 관리 안내</h3>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• 배송지는 최대 20개까지 등록 가능합니다.</li>
              <li>• 기본배송지로 설정된 주소가 주문 시 자동으로 선택됩니다.</li>
              <li>• 공동현관 출입방법과 비밀번호는 배송 시 참고용으로 사용됩니다.</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
