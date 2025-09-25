"use client"

import { useState } from "react"
import { MapPin, Plus, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { AddressForm } from "./address-form"

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

interface AddressSelectorProps {
  addresses: Address[]
  selectedAddressId?: string
  onAddressSelect: (addressId: string) => void
  onAddressAdd?: (address: Omit<Address, "id">) => void
  showAddButton?: boolean
}

export function AddressSelector({
  addresses,
  selectedAddressId,
  onAddressSelect,
  onAddressAdd,
  showAddButton = true,
}: AddressSelectorProps) {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)

  const handleAddAddress = (addressData: Omit<Address, "id">) => {
    if (onAddressAdd) {
      onAddressAdd(addressData)
    }
    setIsAddDialogOpen(false)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-medium flex items-center gap-2">
          <MapPin className="h-4 w-4" />
          배송지 선택
        </h3>
        {showAddButton && (
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm">
                <Plus className="h-4 w-4 mr-1" />새 주소 추가
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
        )}
      </div>

      <RadioGroup value={selectedAddressId} onValueChange={onAddressSelect}>
        <div className="space-y-3">
          {addresses.map((address) => (
            <div key={address.id} className="relative">
              <Label htmlFor={address.id} className="cursor-pointer">
                <Card className={`transition-colors ${selectedAddressId === address.id ? "ring-2 ring-primary" : ""}`}>
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-3">
                      <RadioGroupItem value={address.id} id={address.id} className="mt-1" />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="font-medium">{address.name}</span>
                          {address.isDefault && (
                            <Badge variant="default" className="text-xs">
                              기본배송지
                            </Badge>
                          )}
                          {selectedAddressId === address.id && <Check className="h-4 w-4 text-primary" />}
                        </div>
                        <div className="text-sm space-y-1">
                          <p>
                            <span className="font-medium">{address.recipient}</span>
                            <span className="text-muted-foreground ml-2">{address.phone}</span>
                          </p>
                          <p className="text-muted-foreground">
                            ({address.postcode}) {address.address1} {address.address2}
                          </p>
                          {address.entranceMethod && (
                            <p className="text-muted-foreground text-xs">{address.entranceMethod}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Label>
            </div>
          ))}
        </div>
      </RadioGroup>

      {addresses.length === 0 && (
        <Card className="border-dashed">
          <CardContent className="text-center py-8">
            <MapPin className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
            <p className="text-muted-foreground mb-4">등록된 배송지가 없습니다</p>
            {showAddButton && (
              <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    배송지 추가하기
                  </Button>
                </DialogTrigger>
              </Dialog>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}
