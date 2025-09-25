"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"

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

interface AddressFormProps {
  initialData?: Address
  onSubmit: (data: Omit<Address, "id">) => void
  onCancel: () => void
}

export function AddressForm({ initialData, onSubmit, onCancel }: AddressFormProps) {
  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    recipient: initialData?.recipient || "",
    phone: initialData?.phone || "",
    postcode: initialData?.postcode || "",
    address1: initialData?.address1 || "",
    address2: initialData?.address2 || "",
    isDefault: initialData?.isDefault || false,
    entranceMethod: initialData?.entranceMethod || "",
    entrancePassword: initialData?.entrancePassword || "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  const handlePostcodeSearch = () => {
    // Implement postcode search (Daum Postcode API integration)
    console.log("Postcode search")
  }

  const isFormValid = formData.name && formData.recipient && formData.phone && formData.postcode && formData.address1

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Basic Information */}
      <div className="space-y-4">
        <h3 className="font-medium">기본 정보</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="name">배송지명 *</Label>
            <Input
              id="name"
              name="name"
              placeholder="예: 집, 회사, 학교"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="recipient">받는 분 *</Label>
            <Input
              id="recipient"
              name="recipient"
              placeholder="받는 분 이름"
              value={formData.recipient}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">연락처 *</Label>
          <Input
            id="phone"
            name="phone"
            type="tel"
            placeholder="010-0000-0000"
            value={formData.phone}
            onChange={handleInputChange}
            required
          />
        </div>
      </div>

      <Separator />

      {/* Address Information */}
      <div className="space-y-4">
        <h3 className="font-medium">주소 정보</h3>

        <div className="flex gap-2">
          <Input
            id="postcode"
            name="postcode"
            placeholder="우편번호"
            value={formData.postcode}
            onChange={handleInputChange}
            required
            readOnly
          />
          <Button type="button" variant="outline" onClick={handlePostcodeSearch}>
            우편번호 찾기
          </Button>
        </div>

        <div className="space-y-2">
          <Label htmlFor="address1">주소 *</Label>
          <Input
            id="address1"
            name="address1"
            placeholder="기본 주소"
            value={formData.address1}
            onChange={handleInputChange}
            required
            readOnly
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="address2">상세 주소</Label>
          <Input
            id="address2"
            name="address2"
            placeholder="상세 주소를 입력하세요"
            value={formData.address2}
            onChange={handleInputChange}
          />
        </div>
      </div>

      <Separator />

      {/* Entrance Information */}
      <div className="space-y-4">
        <h3 className="font-medium">공동현관 출입방법</h3>
        <p className="text-sm text-muted-foreground">배송 시 참고용으로 사용됩니다.</p>

        <div className="space-y-2">
          <Label htmlFor="entranceMethod">출입방법</Label>
          <Textarea
            id="entranceMethod"
            name="entranceMethod"
            placeholder="예: 경비실 호출, 비밀번호 입력 등"
            value={formData.entranceMethod}
            onChange={handleInputChange}
            rows={2}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="entrancePassword">비밀번호</Label>
          <Input
            id="entrancePassword"
            name="entrancePassword"
            placeholder="공동현관 비밀번호 (선택사항)"
            value={formData.entrancePassword}
            onChange={handleInputChange}
          />
          <p className="text-xs text-muted-foreground">비밀번호는 보안을 위해 일부 문자가 가려져 표시됩니다.</p>
        </div>
      </div>

      <Separator />

      {/* Options */}
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="isDefault"
            checked={formData.isDefault}
            onCheckedChange={(checked) => setFormData({ ...formData, isDefault: checked as boolean })}
          />
          <Label htmlFor="isDefault" className="text-sm">
            기본 배송지로 설정
          </Label>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end space-x-2 pt-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          취소
        </Button>
        <Button type="submit" disabled={!isFormValid} className="btn-hover">
          {initialData ? "수정" : "추가"}
        </Button>
      </div>
    </form>
  )
}
