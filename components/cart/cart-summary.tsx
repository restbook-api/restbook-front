"use client"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

interface CartSummaryProps {
  totalAmount: number
  totalOriginalAmount: number
  shippingFee: number
  totalPoints: number
  selectedItemsCount: number
  totalItemsCount: number
  onOrderSelected: () => void
  onOrderAll: () => void
}

export function CartSummary({
  totalAmount,
  totalOriginalAmount,
  shippingFee,
  totalPoints,
  selectedItemsCount,
  totalItemsCount,
  onOrderSelected,
  onOrderAll,
}: CartSummaryProps) {
  const totalDiscount = totalOriginalAmount - totalAmount
  const finalAmount = totalAmount + shippingFee

  return (
    <div className="bg-card rounded-lg border p-6 sticky top-24">
      <h3 className="font-semibold mb-4">결제예상금액</h3>

      <div className="space-y-3 text-sm">
        <div className="flex justify-between">
          <span>총 상품금액</span>
          <span>{totalOriginalAmount.toLocaleString()}원</span>
        </div>

        {totalDiscount > 0 && (
          <div className="flex justify-between text-red-600">
            <span>총 할인금액</span>
            <span>-{totalDiscount.toLocaleString()}원</span>
          </div>
        )}

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
          <span>{totalPoints}원</span>
        </div>
      </div>

      <div className="space-y-3 mt-6">
        <Button className="w-full" size="lg" disabled={selectedItemsCount === 0} onClick={onOrderSelected}>
          선택상품 주문하기 ({selectedItemsCount})
        </Button>
        <Button
          variant="outline"
          className="w-full bg-transparent"
          disabled={totalItemsCount === 0}
          onClick={onOrderAll}
        >
          전체상품 주문하기 ({totalItemsCount})
        </Button>
      </div>

      <p className="text-xs text-muted-foreground text-center mt-4">33,000원 이상 구매 시 무료배송</p>
    </div>
  )
}
