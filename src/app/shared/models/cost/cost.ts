export interface Cost {
	costId?: number;
	reason?: string;
	// Inicial o final
	costType?: string;
	// Efectivo o porcentaje
	valueType?: string;
	amount?: number;
}
