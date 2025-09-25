"use client"

import { useState } from "react"
import { ChevronDown, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

export function ProductFilter() {
  const [priceRange, setPriceRange] = useState({ min: "", max: "" })

  const categories = [
    { id: "fiction", label: "소설", count: 1234 },
    { id: "non-fiction", label: "에세이", count: 567 },
    { id: "business", label: "경영/경제", count: 890 },
    { id: "self-help", label: "자기계발", count: 456 },
    { id: "history", label: "역사", count: 234 },
    { id: "science", label: "과학", count: 345 },
  ]

  const publishers = [
    { id: "minumsa", label: "민음사", count: 123 },
    { id: "changbi", label: "창비", count: 234 },
    { id: "munhakdongne", label: "문학동네", count: 345 },
    { id: "gimm-young", label: "김영사", count: 456 },
  ]

  const authors = [
    { id: "author1", label: "김영하", count: 12 },
    { id: "author2", label: "정유정", count: 8 },
    { id: "author3", label: "조남주", count: 15 },
    { id: "author4", label: "한강", count: 20 },
  ]

  return (
    <div className="w-full space-y-6">
      <div className="flex items-center gap-2 pb-4 border-b">
        <Filter className="h-4 w-4" />
        <h2 className="font-semibold">필터</h2>
      </div>

      {/* Price Range */}
      <Collapsible defaultOpen>
        <CollapsibleTrigger asChild>
          <Button variant="ghost" className="flex w-full justify-between p-0 h-auto">
            <span className="font-medium">가격</span>
            <ChevronDown className="h-4 w-4" />
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent className="space-y-3 pt-3">
          <div className="flex gap-2">
            <div className="flex-1">
              <Input
                type="number"
                placeholder="최소"
                value={priceRange.min}
                onChange={(e) => setPriceRange({ ...priceRange, min: e.target.value })}
              />
            </div>
            <span className="flex items-center text-muted-foreground">~</span>
            <div className="flex-1">
              <Input
                type="number"
                placeholder="최대"
                value={priceRange.max}
                onChange={(e) => setPriceRange({ ...priceRange, max: e.target.value })}
              />
            </div>
          </div>
          <Button size="sm" className="w-full">
            적용
          </Button>
        </CollapsibleContent>
      </Collapsible>

      <Separator />

      {/* Categories */}
      <Collapsible defaultOpen>
        <CollapsibleTrigger asChild>
          <Button variant="ghost" className="flex w-full justify-between p-0 h-auto">
            <span className="font-medium">카테고리</span>
            <ChevronDown className="h-4 w-4" />
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent className="space-y-3 pt-3">
          {categories.map((category) => (
            <div key={category.id} className="flex items-center space-x-2">
              <Checkbox id={category.id} />
              <Label htmlFor={category.id} className="flex-1 text-sm cursor-pointer">
                {category.label}
              </Label>
              <span className="text-xs text-muted-foreground">({category.count})</span>
            </div>
          ))}
        </CollapsibleContent>
      </Collapsible>

      <Separator />

      {/* Publishers */}
      <Collapsible>
        <CollapsibleTrigger asChild>
          <Button variant="ghost" className="flex w-full justify-between p-0 h-auto">
            <span className="font-medium">출판사</span>
            <ChevronDown className="h-4 w-4" />
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent className="space-y-3 pt-3">
          {publishers.map((publisher) => (
            <div key={publisher.id} className="flex items-center space-x-2">
              <Checkbox id={publisher.id} />
              <Label htmlFor={publisher.id} className="flex-1 text-sm cursor-pointer">
                {publisher.label}
              </Label>
              <span className="text-xs text-muted-foreground">({publisher.count})</span>
            </div>
          ))}
        </CollapsibleContent>
      </Collapsible>

      <Separator />

      {/* Authors */}
      <Collapsible>
        <CollapsibleTrigger asChild>
          <Button variant="ghost" className="flex w-full justify-between p-0 h-auto">
            <span className="font-medium">작가</span>
            <ChevronDown className="h-4 w-4" />
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent className="space-y-3 pt-3">
          {authors.map((author) => (
            <div key={author.id} className="flex items-center space-x-2">
              <Checkbox id={author.id} />
              <Label htmlFor={author.id} className="flex-1 text-sm cursor-pointer">
                {author.label}
              </Label>
              <span className="text-xs text-muted-foreground">({author.count})</span>
            </div>
          ))}
        </CollapsibleContent>
      </Collapsible>

      <Separator />

      <Button variant="outline" className="w-full bg-transparent">
        필터 초기화
      </Button>
    </div>
  )
}
