ALTER TABLE "orderProduct" ADD COLUMN "OrderID" serial NOT NULL;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "customerId" text;--> statement-breakpoint
ALTER TABLE "orderProduct" ADD CONSTRAINT "orderProduct_OrderID_orders_id_fk" FOREIGN KEY ("OrderID") REFERENCES "public"."orders"("id") ON DELETE cascade ON UPDATE no action;