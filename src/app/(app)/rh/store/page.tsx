/**
 * v0 by Vercel.
 * @see https://v0.dev/t/oJy7ZOIiOtt
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Component() {
  return (
    <div className="p-4 lg:p-8">
      <section className="bg-background">
        <div className="container mx-auto">
          <h2 className="text-xl font-bold mb-4">Filter Stores</h2>
          <div className="flex w-64 ml-auto">
            <Input type="text" placeholder="Buscar por nome ou identificação"  />
          </div>
        </div>
      </section>
      <section className="grid grid-cols-1 gap-4 p-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:p-6">
        <div className="relative overflow-hidden rounded-lg group">
          <Link href="#" className="absolute inset-0 z-10" prefetch={false}>
            <span className="sr-only">View</span>
          </Link>
          <img src="/placeholder.png" alt="Store 1" width={200} height={150} className="object-cover w-full h-32" />
          <div className="p-4 ">
            <h3 className="text-base font-semibold">Acme Bakery</h3>
            <p className="text-sm text-muted-foreground">Identificação: 123456789</p>
            <p className="text-sm text-muted-foreground">Address: 123 Main St, Anytown USA</p>
            <Button variant="outline" size="sm" className="mt-2">
              View Details
            </Button>
          </div>
        </div>
        <Card className="relative bg-card overflow-hidden rounded-lg group">
          <Link href="#" className="absolute inset-0 z-10" prefetch={false}>
            <span className="sr-only">View</span>
          </Link>
          <img src="/placeholder.png" alt="Store 2" width={200} height={150} className="object-cover w-full h-32" />
          <div className="p-4">
            <h3 className="text-base font-semibold">Vintage Emporium</h3>
            <p className="text-sm text-muted-foreground">Identificação: 987654321</p>
            <p className="text-sm text-muted-foreground">Address: 456 Oak Rd, Smalltown CA</p>
            <Button variant="outline" size="sm" className="mt-2">
              View Details
            </Button>
          </div>
        </Card>
        <div className="relative overflow-hidden rounded-lg group">
          <Link href="#" className="absolute inset-0 z-10" prefetch={false}>
            <span className="sr-only">View</span>
          </Link>
          <img src="/placeholder.png" alt="Store 3" width={200} height={150} className="object-cover w-full h-32" />
          <div className="p-4">
            <h3 className="text-base font-semibold">Eco Boutique</h3>
            <p className="text-sm text-muted-foreground">Identificação: 555555555</p>
            <p className="text-sm text-muted-foreground">Address: 789 Green Ave, Ecotopia OR</p>
            <Button variant="outline" size="sm" className="mt-2">
              View Details
            </Button>
          </div>
        </div>
        <div className="relative overflow-hidden rounded-lg group">
          <Link href="#" className="absolute inset-0 z-10" prefetch={false}>
            <span className="sr-only">View</span>
          </Link>
          <img src="/placeholder.png" alt="Store 4" width={200} height={150} className="object-cover w-full h-32" />
          <div className="p-4 bg-background">
            <h3 className="text-base font-semibold">Artisan Crafts</h3>
            <p className="text-sm text-muted-foreground">Identificação: 111222333</p>
            <p className="text-sm text-muted-foreground">Address: 321 Craft Ln, Handmade City WA</p>
            <Button variant="outline" size="sm" className="mt-2">
              View Details
            </Button>
          </div>
        </div>
        <div className="relative overflow-hidden rounded-lg group">
          <Link href="#" className="absolute inset-0 z-10" prefetch={false}>
            <span className="sr-only">View</span>
          </Link>
          <img src="/placeholder.png" alt="Store 5" width={200} height={150} className="object-cover w-full h-32" />
          <div className="p-4 bg-background">
            <h3 className="text-base font-semibold">Gourmet Grocer</h3>
            <p className="text-sm text-muted-foreground">Identificação: 444666888</p>
            <p className="text-sm text-muted-foreground">Address: 159 Flavor Blvd, Gourmetville CA</p>
            <Button variant="outline" size="sm" className="mt-2">
              View Details
            </Button>
          </div>
        </div>
        <div className="relative overflow-hidden rounded-lg group">
          <Link href="#" className="absolute inset-0 z-10" prefetch={false}>
            <span className="sr-only">View</span>
          </Link>
          <img src="/placeholder.png" alt="Store 6" width={200} height={150} className="object-cover w-full h-32" />
          <div className="p-4 bg-background">
            <h3 className="text-base font-semibold">Wellness Oasis</h3>
            <p className="text-sm text-muted-foreground">Identificação: 777888999</p>
            <p className="text-sm text-muted-foreground">Address: 246 Serenity Ln, Relaxation Town OR</p>
            <Button variant="outline" size="sm" className="mt-2">
              View Details
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}