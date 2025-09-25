import Link from "next/link"
import { Facebook, Twitter, Instagram, Youtube } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-slate-100 border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">북</span>
              </div>
              <span className="font-bold text-xl text-primary">RestBook</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              독서의 즐거움을 전하는 온라인 서점입니다. 다양한 도서와 함께 풍요로운 독서 생활을 만들어보세요.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Instagram className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Youtube className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Company Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">COMPANY</h3>
            <div className="space-y-2">
              <Link href="/about" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                회사소개
              </Link>
              <Link
                href="/contact"
                className="block text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                고객센터
              </Link>
              <Link
                href="/careers"
                className="block text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                채용정보
              </Link>
              <Link href="/press" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                보도자료
              </Link>
            </div>
          </div>

          {/* Service Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">SERVICE</h3>
            <div className="space-y-2">
              <Link
                href="/membership"
                className="block text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                멤버십
              </Link>
              <Link href="/events" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                이벤트
              </Link>
              <Link
                href="/reviews"
                className="block text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                리뷰
              </Link>
              <Link
                href="/recommendations"
                className="block text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                추천도서
              </Link>
            </div>
          </div>

          {/* Important Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">IMPORTANT LINKS</h3>
            <div className="space-y-2">
              <Link
                href="/privacy"
                className="block text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                개인정보처리방침
              </Link>
              <Link href="/terms" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                이용약관
              </Link>
              <Link
                href="/shipping"
                className="block text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                배송안내
              </Link>
              <Link
                href="/returns"
                className="block text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                교환/반품
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">© 2025 RestBook. All Rights Reserved.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <Link href="/privacy" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Privacy
            </Link>
            <span className="text-muted-foreground">|</span>
            <Link href="/terms" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
