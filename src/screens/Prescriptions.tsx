
import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import MobileHeader from '@/components/MobileHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Camera, 
  Upload, 
  Pill, 
  MapPin, 
  Clock,
  Truck,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

const Prescriptions = () => {
  const { t } = useLanguage();
  const [selectedPharmacy, setSelectedPharmacy] = useState<string | null>(null);

  const prescriptions = [
    {
      id: 1,
      medication: 'Amoxicillin 500mg',
      doctor: 'Dr. Sarah Johnson',
      date: '2024-06-01',
      dosage: '3 times daily for 7 days',
      status: 'active',
      remaining: 15,
      total: 21
    },
    {
      id: 2,
      medication: 'Ibuprofen 400mg',
      doctor: 'Dr. Michael Brown',
      date: '2024-05-28',
      dosage: 'As needed for pain',
      status: 'completed',
      remaining: 0,
      total: 20
    }
  ];

  const nearbyPharmacies = [
    {
      id: 1,
      name: 'Health Plus Pharmacy',
      address: '123 Main Street',
      distance: '0.5 km',
      deliveryTime: '30-45 mins',
      deliveryFee: 'Free',
      rating: 4.8,
      acceptsInsurance: true
    },
    {
      id: 2,
      name: 'Metro Drug Store',
      address: '456 Central Ave',
      distance: '1.2 km',
      deliveryTime: '45-60 mins',
      deliveryFee: '$3.99',
      rating: 4.6,
      acceptsInsurance: true
    },
    {
      id: 3,
      name: '24/7 Pharmacy',
      address: '789 Night Owl Blvd',
      distance: '2.1 km',
      deliveryTime: '60-90 mins',
      deliveryFee: '$5.99',
      rating: 4.4,
      acceptsInsurance: false
    }
  ];

  const deliveryTracking = [
    {
      id: 1,
      medication: 'Amoxicillin 500mg',
      pharmacy: 'Health Plus Pharmacy',
      status: 'preparing',
      estimatedDelivery: '2:30 PM',
      trackingNumber: 'TRK001234'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <MobileHeader title={t('prescriptions')} showBack={true} />

      <div className="p-4">
        <Tabs defaultValue="upload" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="upload">Upload</TabsTrigger>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="delivery">Delivery</TabsTrigger>
          </TabsList>

          {/* Upload Prescription */}
          <TabsContent value="upload" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Upload className="w-5 h-5 text-travel-teal" />
                  <span>{t('uploadPrescription')}</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-600">
                  Upload your prescription to order medicines with delivery to your location.
                </p>

                {/* Upload Options */}
                <div className="grid grid-cols-2 gap-4">
                  <Button 
                    variant="outline" 
                    className="h-24 flex-col space-y-2"
                    onClick={() => {/* Handle camera upload */}}
                  >
                    <Camera className="w-8 h-8 text-travel-teal" />
                    <span className="text-sm">Take Photo</span>
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="h-24 flex-col space-y-2"
                    onClick={() => {/* Handle file upload */}}
                  >
                    <Upload className="w-8 h-8 text-travel-teal" />
                    <span className="text-sm">Upload File</span>
                  </Button>
                </div>
                
                <div className="bg-blue-50 p-3 rounded-lg text-sm text-blue-700">
                  <p className="font-medium">Why upload your prescription?</p>
                  <ul className="mt-1 space-y-1 list-disc pl-4">
                    <li>Get medication delivered to your location</li>
                    <li>Ensure correct medication as prescribed</li>
                    <li>Store prescriptions securely in your account</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Nearby Pharmacies */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <MapPin className="w-5 h-5 text-travel-teal" />
                  <span>Select Pharmacy</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {nearbyPharmacies.map((pharmacy) => (
                    <div 
                      key={pharmacy.id}
                      className={`p-3 rounded-lg border ${selectedPharmacy === pharmacy.id.toString() ? 'border-travel-teal bg-travel-teal/5' : 'border-gray-200'} cursor-pointer`}
                      onClick={() => setSelectedPharmacy(pharmacy.id.toString())}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="font-medium">{pharmacy.name}</h4>
                          <p className="text-xs text-gray-600">{pharmacy.address}</p>
                        </div>
                        <Badge variant="outline">{pharmacy.distance}</Badge>
                      </div>
                      
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center space-x-1">
                          <Clock className="w-3 h-3 text-gray-500" />
                          <span className="text-xs">{pharmacy.deliveryTime}</span>
                        </div>
                        <div className="text-xs">
                          {pharmacy.deliveryFee === 'Free' ? (
                            <span className="text-green-600 font-medium">Free Delivery</span>
                          ) : (
                            <span>{pharmacy.deliveryFee} delivery fee</span>
                          )}
                        </div>
                      </div>
                      
                      {pharmacy.acceptsInsurance && (
                        <div className="mt-2 text-xs text-green-600">
                          ✓ Accepts your insurance
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Active Prescriptions */}
          <TabsContent value="active" className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Your Prescriptions</h3>
              {prescriptions.map((prescription) => (
                <Card 
                  key={prescription.id}
                  className={prescription.status === 'active' ? 'border-travel-teal' : 'border-gray-200'}
                >
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="font-semibold">{prescription.medication}</h4>
                        <p className="text-sm text-gray-600">Doctor: {prescription.doctor}</p>
                        <p className="text-sm text-gray-600">Date: {prescription.date}</p>
                      </div>
                      <Badge variant={prescription.status === 'active' ? "default" : "secondary"}>
                        {prescription.status === 'active' ? 'Active' : 'Completed'}
                      </Badge>
                    </div>

                    <div className="p-3 bg-gray-50 rounded-lg mb-3">
                      <p className="text-sm font-medium">Dosage Instructions</p>
                      <p className="text-sm text-gray-700">{prescription.dosage}</p>
                    </div>

                    {prescription.status === 'active' && (
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">Remaining pills</span>
                          <span className="font-medium">{prescription.remaining} of {prescription.total}</span>
                        </div>
                        
                        <div className="bg-gray-200 rounded-full h-2 overflow-hidden">
                          <div 
                            className="bg-travel-teal h-2"
                            style={{ width: `${(prescription.remaining / prescription.total) * 100}%` }}
                          ></div>
                        </div>
                        
                        <div className="flex justify-end">
                          <Button size="sm" className="mt-2 bg-travel-teal hover:bg-travel-teal/90">
                            Refill Prescription
                          </Button>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}

              {prescriptions.length === 0 && (
                <Card>
                  <CardContent className="p-8 text-center">
                    <Pill className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">No Active Prescriptions</h3>
                    <p className="text-gray-600">All your prescribed medications will appear here</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          {/* Delivery Tracking */}
          <TabsContent value="delivery" className="space-y-6">
            {deliveryTracking.length > 0 ? (
              <>
                <h3 className="text-lg font-semibold">Track Orders</h3>
                {deliveryTracking.map((delivery) => (
                  <Card key={delivery.id}>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h4 className="font-semibold">{delivery.medication}</h4>
                          <p className="text-sm text-gray-600">{delivery.pharmacy}</p>
                        </div>
                        <Badge variant="outline">#{delivery.trackingNumber}</Badge>
                      </div>
                      
                      <div className="space-y-4 mb-4">
                        <p className="text-sm">
                          <span className="font-medium">Estimated delivery:</span> Today, {delivery.estimatedDelivery}
                        </p>
                        
                        {/* Progress Tracking */}
                        <div className="relative">
                          <div className="flex justify-between mb-2 text-xs">
                            <span>Order Placed</span>
                            <span>Preparing</span>
                            <span>Out for Delivery</span>
                            <span>Delivered</span>
                          </div>
                          
                          <div className="h-1.5 bg-gray-200 rounded-full">
                            <div className="h-1.5 bg-travel-teal rounded-full" style={{ width: '40%' }}></div>
                          </div>
                          
                          <div className="flex justify-between mt-1">
                            <div className="w-6 h-6 bg-travel-teal rounded-full flex items-center justify-center">
                              <CheckCircle className="w-4 h-4 text-white" />
                            </div>
                            <div className="w-6 h-6 bg-travel-teal rounded-full flex items-center justify-center">
                              <Pill className="w-3.5 h-3.5 text-white" />
                            </div>
                            <div className="w-6 h-6 bg-gray-300 rounded-full"></div>
                            <div className="w-6 h-6 bg-gray-300 rounded-full"></div>
                          </div>
                        </div>

                        <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg">
                          <div className="flex items-center space-x-2">
                            <AlertCircle className="w-4 h-4 text-amber-600" />
                            <p className="text-sm text-amber-800">
                              Your medication is being prepared and will be out for delivery soon.
                            </p>
                          </div>
                        </div>
                      </div>
                      
                      <Button variant="outline" className="w-full text-travel-teal border-travel-teal">
                        <Truck className="w-4 h-4 mr-2" />
                        View Detailed Tracking
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </>
            ) : (
              <Card>
                <CardContent className="p-8 text-center">
                  <Truck className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No Active Deliveries</h3>
                  <p className="text-gray-600 mb-4">
                    You don't have any medication deliveries in progress
                  </p>
                  <Button className="bg-travel-teal hover:bg-travel-teal/90">
                    Order Medication
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Prescriptions;
